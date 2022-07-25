'use strict'
const jwt = require('jsonwebtoken');

const response = require("./responses");
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');

class BaseValidation {
	validateToken(req, res, next) {
		try {
			let token = req.headers["authorization"];
			if (!token || (token && !token.startsWith("Bearer "))) {
				logger.error(loggerMessage.unauthorized);
				return response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
			};
			token = token.slice(7, token.length);
			return jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
				if (error) {
					logger.error(loggerMessage.unauthorized);
					response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
				} else {
					logger.info(loggerMessage.tokenVerifed);
					req.user = payload;
					next();
				}
			});
		} catch (error) {
			logger.error(loggerMessage.unauthorized);
			response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
		}
	};
}

module.exports = new BaseValidation();