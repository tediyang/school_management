const { Express } = require('express');
const { schoolRoutes } = require('./school_routes');
const { PATH_PREFIX } = require('../lib/boot');

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} app
 */
const injectRoutes = (app) => {
  app.use(PATH_PREFIX, schoolRoutes);
};

module.exports = { injectRoutes };
