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

// Creates new book objects based of user input searches
function Book(idx) {
  this.title = idx.volumeInfo.title ? idx.volumeInfo.title : 'No title found';
  this.author = idx.volumeInfo.authors ? idx.volumeInfo.authors[0] : 'No author found';
  this.description = idx.volumeInfo.description ? idx.volumeInfo.description : 'Book description not found';
  this.image_url = idx.volumeInfo.imageLinks ? idx.volumeInfo.imageLinks.thumbnail : 'No image available';
  this.isbn = idx.volumeInfo.industryIdentifiers ? idx.volumeInfo.industryIdentifiers[0].identifier : 'No ISBN info available';
  this.category = idx.volumeInfo.categories ? idx.volumeInfo.categories[0] : 'This is a book'
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

//call dbClient to bring back all SQL results
// like calling the API
// convert array into constructed books
// display on ejs partials 

// handles Google Books API request/response
function handleBooks(request, response, next) {
  const {bookQuery, filter} = request.body;
  const url = `https://www.googleapis.com/books/v1/volumes?q=+${filter}:${bookQuery}`;

  superagent.get(url)
    .then(bookResponse =>{
      const bookData = bookResponse.body.items;
      return bookData.map( idx => new Book(idx))
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
    .catch(  error => errorHandler('Single book error', request, response, next));
}

// function to handle errors
function errorHandler(error, request, response, next) {
  response/*.status(404)*/
          .render('./pages/error', {error});
}

// GET/POST routes
app.use(cors());
app.get('/', renderDatabase);
app.post('/searches', handleBooks);
app.post('/books/:id', singleBook);
app.get('/searches/new', (request, response) => {
  response.render('./searches/new');
});


// Start server and listen for requests
app.listen(PORT, () => {
  console.log('Server is running on PORT ' + PORT)
});
