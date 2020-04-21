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

// Start server and listen for requests
app.listen(PORT, () => {
  console.log('Server is running on PORT ' + PORT)
});