'use strict'

// Import libraries and dependencies, set server standards
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');

// Server port
const PORT = process.env.PORT || 3000;

// Create express instance
const app = express();

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

// handles Google Books API request/response
function handleBooks(request, response, next) {
  const {bookQuery, filter} = request.body;
  console.log('request results', request.body);
  const url = `https://www.googleapis.com/books/v1/volumes?q=+${filter}:${bookQuery}`;

  superagent.get(url)
    .then(bookResponse =>{
      const bookData = bookResponse.body.items;
      console.log(bookData)
      return bookData.map( idx => new Book(idx))
    })
    .then(bookResults => {
      response.status(200).render('./searches/show', {bookResults})
    })
    .catch( error => errorHandler('Book error', request, response, next));
}

// function to handle errors
function errorHandler(error, request, response, next) {
  response.status(404)
          .render('./pages/error', {error});
}

// function to render error page

// GET routes
app.use(cors());
app.get('/', (request, response) => {
  response.render('./pages/index');
});
app.get('/searches/new', (request, response) => {
  response.render('./searches/new');
});
app.post('/searches', handleBooks);

// Start server and listen for requests
app.listen(PORT, () => {
  console.log('Server is running on PORT ' + PORT)
});