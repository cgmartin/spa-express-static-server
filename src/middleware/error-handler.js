'use strict';

var path = require('path');

/**
 * Express route error handler: send back error status and custom pages
 */
module.exports = function createErrorHandler(options) {
    return function(err, req, res, next) {
        if (err.headers) {
            res.set(err.headers);
        }

        var status = err.status || 500;
        res.status(status);

        if (status === 404 && options.custom404Page) {
            res.sendFile(path.resolve(path.join(options.webRootPath, options.custom404Page)));
        } else if (options.customErrorPage) {
            res.sendFile(path.resolve(path.join(options.webRootPath, options.customErrorPage)));
        } else {
            res.send(err.message);
        }
    };
};
