require('dotenv').config();
const { Express } = require('express');
const { logger } = require('../logger');
const { getStorage } = require('../models/engine/storage');
const PATH_PREFIX = '/api/v1';


/**
 * Starts an Express.js server and returns the server instance.
 *
 * @param {Express} app - The Express.js app.
 * @returns {http.Server} - The server instance.
 */
const startServer = (app) => {
  const port = process.env.APP_PORT || 5000;
  app = app.listen(port, () => {
    logger.info(`Server listening on PORT ${port}`);;
  });

  return app;
};

/**
 * Closes the database connection and logs a message to the console.
 *
 * @returns {Promise<void>} - A Promise that resolves when the connection is successfully closed.
 */
const doCleanUps = async () => {
  const { Storage } = await getStorage();
  await Storage.close_connection();
  logger.info('Database connection closed', new Date().getTime());
};

const gracefullyShutdown = async (app) => {
  // Handle shutdown signals
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
        logger.info(`Received ${signal}. Starting graceful shutdown...`);

        // Stop accepting new connections
        app.close(async (err) => {
          if (err) {
            logger.error('Error during server closure', err);
            process.exit(1);
          }
          await doCleanUps();
          logger.info('Server has shut down gracefully.');
          process.exit(0);
        });

        // Force shutdown after a timeout
        setTimeout(() => {
          logger.warn('Forcing shutdown due to timeout.');
          process.exit(1);
        }, 10000);
      });
  });
};

module.exports = { startServer, gracefullyShutdown, PATH_PREFIX };
