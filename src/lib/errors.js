'use strict';
/**
 * Custom error classes
 */
var util = require('util');

function NotFoundError(message) {
    Error.call(this);
    Error.captureStackTrace(this, NotFoundError);
    this.message = message || 'Not found';
    this.status = 404;
}

util.inherits(NotFoundError, Error);

module.exports = {
    NotFoundError: NotFoundError
};
