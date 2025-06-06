require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { logger } = require('../logger.js');


const injectMiddlewares = (app) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS;
  
  // Enable cors
  app.use(cors({
      origin: allowedOrigins,
      methods: 'GET,POST,OPTIONS',
      credentials: true, // Include cookies in CORS requests
      optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
    }));

  // to parse request body as json
  app.use(express.json({ limit: '1000kb'}));

  // Middleware to handle JSON parsing errors
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      logger.error('Invalid Syntax Error:', err);
      return res.status(400).json({ error: 'Invalid JSON format' });
    }
    next();
  });  

  // for logging requests details
  app.use(morgan('dev'));
};

module.exports = { injectMiddlewares };
