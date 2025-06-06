const { logger } = require('../../logger');
const db = require('../index');
const { Model } = require('sequelize');
require('dotenv').config();

class Storage {
  static page_size = 10;
  constructor() {
    this.connection = null;
    this.models = db.models
  }

  /**
   * Creates a new instance of the Storage class and connects to the database.
   * @return {Promise<Storage>} A promise that resolves to the Storage instance.
   * @throws {Error} If the connection to the database fails.
   */
  static async create() {
    const instance = new Storage();
    try {
      instance.connection = db.sequelize;
      await instance.connection.authenticate();
      logger.info('Database connection successful');
    } catch (error) {
      logger.error('Database connection failed');
      throw error;
    }
    return instance;
  }

  /**
   * Closes the connection to the database.
   *
   * @return {Promise<void>} - A Promise that resolves when the connection is successfully closed.
   */
  async close_connection() {
    try {
      this.connection && await this.connection.close();
      logger.info('Database connection closed', new Date().getTime());
    } catch (error) {
      throw error;
    }
  }
}

const storage_promise =(async () => {
  return await Storage.create();
})();

let storage = null;
storage_promise
  .then((result) => {
    storage = result;
    logger.info('Storage created successfully');
  })
  .catch((error) => {
    logger.error("Error creating storage");
    logger.error(error);
  });


/**
 * Retrieves the Storage singleton instance.
 *
 * @return {Promise<Object>} A Promise that resolves to an object containing the Storage
 *   instance, the connection to the database, and all the models defined in the
 *   database.
 */
const getStorage = async () => {
  if (!storage) {
    logger.info('Creating Storage...');
    storage = await storage_promise;
  }

  return {
    Storage: storage,
    Connection: storage.connection,
    ...storage.connection.models
  };
};

/**
 * Returns information about pagination for a given filter and table.
 * @param {object} filter - The filter to apply to the table.
 * @param {Model|null} model - Sequelize Model. If null, the function returns null.
 * @param {number} page_size - The number of items per page.
 * @param {number} page - The current page number.
 * @returns {object} - An object containing pagination information, haveNextPage, currentPageExists, totalPages and null if table does not exist.
 * @throws {Error} - If there is an error while retrieving the pagination information.
 */
const page_info = async (filter={}, model=null, options=null, page_size=Storage.page_size, page=1) => {
  try {
    if(model) {
      let totalCount = null;
      if(options) {
        totalCount = await model.count({
          where: filter,
          ...options
        });
      } else {
        totalCount = await model.count(filter);
      }
      

      let totalPages = Math.ceil(totalCount / page_size);

      return {
        haveNextPage: page < totalPages,
        currentPageExists: page <= totalPages,
        totalPages: totalPages,
        total: totalCount,
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
}

module.exports = { 
  getStorage,
  page_info,
  Storage
};
