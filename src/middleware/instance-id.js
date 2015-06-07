'use strict';

/**
 * Adds an instance id variable to the request object
 */
module.exports = function instanceId(id) {
    return function(req, res, next) {
        req.instanceId = id;
        next();
    };
};
