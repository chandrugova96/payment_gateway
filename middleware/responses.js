'use strict'
class Response {
    // triggering a success response
    success(req, res, status, data, message) {
        data = data ? data : null;
        message = message ? message : "Success"
        let response = {
            status,
            message,
            data,
        }
        return res.status(status).json(response);
    }
    // triggering a error response
    errors(req, res, status, data, message, encrypt = true) {
        let response = {
            status,
            message,
            data,
        };
        return res.status(status).json(response);
    }
    // triggering a joi error response
    joierrors(req, res, err) {
        let error = err.details.map(e => e.message.replace(/"/g, ""));
        let message = "Bad Request";
        let status = 400;
        return res.status(status).json({
            success: false,
            status,
            message,
            error: error.join(', '),
        });
    }
}

module.exports = new Response();
