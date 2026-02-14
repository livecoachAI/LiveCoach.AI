const logger = require('../utils/logger');
const { errorResponse } = require('../utils/response');

//Not Found Handler (404)
const notFoundHandler = (req, res, next) => {
    return errorResponse(
        res,
        404,
        `Route not found: ${req.method} ${req.originalUrl}`,
        {
            availableRoutes: [
                'POST /api/auth/register',
                'POST /api/auth/login',
                'GET /api/user/profile',
                'PUT /api/user/profile',
            ]
        }
    );
};

//Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
    logger.error('Global error handler caught:', err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message,
        }));

        return errorResponse(
            res,
            400,
            'Validation error occurred',
            errors
        );
    }

    // Mongoose duplicate key error (E11000)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return errorResponse(
            res,
            409,
            `${field} already exists. Please use a different value.`,
            { field, value: err.keyValue[field] }
        );
    }

    // Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        return errorResponse(
            res,
            400,
            'Invalid ID format',
            { field: err.path, value: err.value }
        );
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return errorResponse(res, 401, 'Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 401, 'Token has expired');
    }

    // Default error (500 Internal Server Error)
    return errorResponse(
        res,
        err.statusCode || 500,
        err.message || 'Internal server error',
        process.env.NODE_ENV === 'development' ? { stack: err.stack } : null
    );
};

module.exports = {
    notFoundHandler,
    globalErrorHandler,
};