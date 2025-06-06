const express = require('express');
const { SchoolController } = require('../controllers');

/**
 * Binds the routes to the appropriate handler in the
 * given Express application.
 * @param {Express} app The Express application.
 * @author Eyang, Daniel Eyoh <https://github.com/tediyang>
 */

// create router
const schoolRoutes = express.Router();

schoolRoutes.post('/addSchool', SchoolController.addSchool);

schoolRoutes.get('/listSchools', SchoolController.listSchools);

module.exports = { schoolRoutes };
