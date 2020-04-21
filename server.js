'use strict'

// Import libraries and dependencies, set server standards
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');

// Server port
const PORT = process.env.PORT || 8000;

// Create express instance
const app = express();

// EJS setup
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

// Creates new book objects based of user input searches
function Book(idx) {
  this.title = idx.volumeInfo.title;
  this.author = idx.volumeInfo.authors;
  this.description = idx.volumeInfo.description ? idx.volumeInfo.description: 'A book of mystery';
}

// handles Google Books API request/response
function handleBooks(request, response, next) {
  const {bookQuery, filter} = request.body;
  console.log('request results', request.body);
  const url = `https://www.googleapis.com/books/v1/volumes?q=+${filter}:${bookQuery}`;

  superagent.get(url)
    .then(bookResponse =>{
      const bookData = bookResponse.body.items;
      // console.log('res.items', bookData);
      response.status(200).send(bookData.map( idx => new Book(idx)))
    })
    .catch( error => errorHandler('Book error', request, response, next));
}

// function to handle errors
function errorHandler(error, request, response, next) {
  response.status(500).send(error);
}

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