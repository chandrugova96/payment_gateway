'use strict'
const response = require("../middleware/responses");
const { statusCodes, responseMessage } = require('../constants');

class BaseValidation {
	validateBody(req, res, next, schema){
		try {
			const { error } = schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};

	validateQuery(req, res, next, schema){
		try {
			const { error } = schema.validate(req.query);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};
}

module.exports = new BaseValidation();