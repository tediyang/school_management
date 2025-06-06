require('dotenv').config();
const { Op, Sequelize } = require('sequelize');
const { getStorage } = require('../models/engine/storage');
const handleResponse = require('../util/handleResponse');
const { schoolValidator } = require('../util/validators');
const calculateHaversineDistance = require('../util/helperFunctions');
const Joi = require('joi');


/**
 * Contains the UserController class
 * which defines route handlers.
 * @author Eyang Daniel Eyoh <https://github.com/tediyang>
 */

class SchoolController {
	/**
	 * Creates a new school and persists it to the database.
	 * @param {Object} req - The request object containing the school details.
	 * @param {Object} res - The response object used to send data back to the client.
	 * @return {void}
	 * @throws {JsonWebTokenError} If the JSON Web Token is invalid.
	 * @throws {Error} If an unexpected error occurs.
	 */
	static async addSchool(req, res) {
		try {
			// Ensure req.body is defined
			req.body = req.body || {};

			// validate user input
			const { value, error } = schoolValidator.AddSchool.validate(req.body);
			if (error) {
				throw error;
			};

			// normalize input data
			value.name = value.name.toLowerCase().trim();
			value.address = value.address.toLowerCase();

			const { School } = await getStorage();

			// create school
			await School.create({ ...value });

			return handleResponse(res, 201, 'School created successfully');
		} catch (error) {
      if (error instanceof Sequelize.ValidationError) {
        const errorMessages = error.errors[0];
        return handleResponse(res, 500, "Validation Error", errorMessages);
      } else if (error instanceof Sequelize.ConnectionError) {
        const errorMessages = error.errors[0];
        return handleResponse(res, 500, "Database Error.", errorMessages);
      } else if (error instanceof Joi.ValidationError) {
        return handleResponse(res, 400, error.details[0].message);
      }
      return handleResponse(res, 500, error.message, error);
		}
	}

	/**
	 * Retrieves a list of all schools from the database, sorted by proximity to the given lat,lng coordinates.
	 * @param {Object} req - The request object containing the coordinates.
	 * @param {Object} res - The response object used to send data back to the client.
	 * @return {void}
	 * @throws {Sequelize.ConnectionError} - If there is an error while connecting to the database.
	 * @throws {Joi.ValidationError} - If there is an error validating the request query.
	 * @throws {Error} - If an unexpected error occurs.
	 */
	static async listSchools(req, res) {
		try {
			const { value, error } = schoolValidator.ListSchools.validate(req.query);
			if (error) throw error;

			const { latitude, longitude } = value;
			const { School } = await getStorage();

			// find all schools
			const schools = await School.findAll();
			if (schools.length === 0) {
				return handleResponse(res, 404, 'No schools found');
			}

			// calculate proximity and sort schools
			const sortedSchools = schools
				.map((school) => {
					const distance_km = calculateHaversineDistance(latitude, longitude, school.latitude, school.longitude);

					return { ...school.toJSON(), distance_km };
				})
				.sort((a, b) => a.distance_km - b.distance_km);

			return res
				.status(200)
				.json({
					message: 'Schools retrieved successfully',
					data: sortedSchools,
				});
		} catch (error) {
      if (error instanceof Sequelize.ConnectionError) {
        const errorMessages = error.errors[0];
        return handleResponse(res, 500, "Database Error.", errorMessages);
      } else if (error instanceof Joi.ValidationError) {
        return handleResponse(res, 400, error.details[0].message);
      }
      return handleResponse(res, 500, error.message, error);
		}
	}
}

module.exports = SchoolController;
