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
app.use(express.static('./public'));
app.set('view engine', 'ejs');


// GET routes
app.use(cors());
app.get('/', (request, response) => {
  response.render('./pages/index')
});

// Start server and listen for requests
app.listen(PORT, () => {
  console.log('Server is running on PORT ' + PORT)
});