process.traceProcessWarnings = true;
const { injectRoutes } = require('./routes');
const { injectMiddlewares } = require('./lib/setup.js');
const { startServer, gracefullyShutdown } = require('./lib/boot.js');
const express = require('express');
const { appLogger } = require('./logger');
require('dotenv').config();

const app = express();

// Setup logger
app.use(appLogger);

// inject middlewares
injectMiddlewares(app);

// maps all routes to our express app
injectRoutes(app);

// start server
const startedServer = startServer(app);

gracefullyShutdown(startedServer);

module.exports = app;
