'use strict'

// Import libraries and dependencies, set server standards
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const override = require('method-override');
const cors = require('cors');

// Server port
const PORT = process.env.PORT || 3000;

// Create express instance
const app = express();

// Create database instance
const dbClient = new pg.Client(process.env.DATABASE_URL);

// Test database connection
dbClient.connect(error => {
  if (error) {
    console.error('Connect to database: Failed', error.stack)
  } else {
    console.log('Connect to database: Success')
  }
})

// EJS setup
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(override('_method'));

// Creates new book objects based of user input searches
function Book(idx, searchIndex) {
  this.title = idx.volumeInfo.title ? idx.volumeInfo.title : 'No title found';
  this.author = idx.volumeInfo.authors ? idx.volumeInfo.authors[0] : 'No author found';
  this.description = idx.volumeInfo.description ? idx.volumeInfo.description : 'Book description not found';
  this.image_url = idx.volumeInfo.imageLinks ? idx.volumeInfo.imageLinks.thumbnail : 'No image available';
  this.isbn = idx.volumeInfo.industryIdentifiers ? idx.volumeInfo.industryIdentifiers[0] : 'No ISBN info available';
  this.bookshelf = idx.volumeInfo.category ? idx.volumeInfo.category[0] : 'This is a book'
  this.searchIndex = searchIndex;
}

// Render data from database
function renderDatabase(request, response, next) {
  let matchSQL = `SELECT * FROM books;`;

  dbClient.query(matchSQL)
    .then( sqlResults => {
      if (sqlResults.rowCount === 0) {
        response.render('searches/new')
      } else {
        response.render('pages/index', {sqlResults});
      }
    })
    .catch( error => errorHandler('Database book error', request, response, next));
}

// global of array of current searches
let bookArray = [];

function saveToDatabase(request, response, next) {
  let res = Number(request.body.saveData);

  let addBook = `INSERT INTO books (title, author, description, image_url, isbn, bookshelf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  let addValues = [bookArray[res].title, bookArray[res].author, bookArray[res].description, bookArray[res].image_url, bookArray[res].isbn, bookArray[res].bookshelf];

  dbClient.query(addBook, addValues)
    .then( data => {
      let book = data.rows[0];
      response.status(200).render('pages/books/single-show', {book})
    })
    .catch( error => {
      errorHandler('save to database error', request, response, next)
    })
}

// handles Google Books API request/response
function handleBooks(request, response, next) {
  console.log(request.body)
  const {bookQuery, filter} = request.body;
  const url = `https://www.googleapis.com/books/v1/volumes?q=+${filter}:${bookQuery}`;

  superagent.get(url)
    .then(bookResponse =>{
      const bookData = bookResponse.body.items;
      bookArray = bookData.map( (item, idx) => new Book(item, idx))
      return bookArray;
    })
    .then(bookResults => {
      response.status(200).render('./searches/show', {bookResults})
    })
    .catch( error => errorHandler('Book error', request, response, next));
}

// get a single book by database ID
function singleBook(request, response, next) {
  let bookID = request.params.id;
  let selectQuery = `SELECT * FROM books WHERE id=$1;`;
  let selectValues = [bookID];

  dbClient.query(selectQuery, selectValues)
    .then( data => {
      let book = data.rows[0];
      response.status(200).render('pages/books/single-show' , {book})
    })
    .catch( error => errorHandler('Single book error', request, response, next));
}

function updateDetails(request, response, next){
  const bookID = request.params.id;
  const {author, title, isbn, image_url, description, bookshelf} = request.body;
  
  let sql = `UPDATE books SET author=$1, title=$2, isbn=$3, image_url=$4, description=$5, bookshelf=$6 WHERE id=$7 RETURNING *;`;
  let sqlValues = [author, title, isbn, image_url, description, bookshelf, bookID];

  dbClient.query( sql, sqlValues)
    .then( data => {
      const book = data.rows[0];
      response.render('./pages/books/single-show', {book})
    })
    .catch(error => errorHandler('Single book error', request, response, next))
  
}

function deleteBook(request, response, next){
  const bookID = request.params.id;

  let matchSQL = `SELECT * FROM books;`;
  let sql = `DELETE FROM books WHERE id=$1 RETURNING *;`;
  let sqlValue = [bookID];

  dbClient.query(sql, sqlValue)
  dbClient.query(matchSQL)
    .then( data => {
      response.redirect('/')
    })
    .catch(error => errorHandler('Single book error', request, response, next))
}

// function to handle errors
function errorHandler(error, request, response, next) {
  response.render('./pages/error', {error});
}

// GET/POST routes
app.use(cors());
app.get('/', renderDatabase);
app.post('/searches', handleBooks);
app.post('/books/:id', singleBook);
app.put('/books/:id', updateDetails);
app.delete('/books/:id', deleteBook);
app.post('/books', saveToDatabase);
app.get('/searches/new', (request, response) => {
  response.render('./searches/new');
});

// Start server and listen for requests
app.listen(PORT, () => {
  console.log('Server is running on PORT ' + PORT)
});
