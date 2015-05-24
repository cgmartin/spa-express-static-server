'use strict';

module.exports = function instanceId(id) {
    return function(req, res, next) {
        req.instanceId = id;
        next();
    };
};
