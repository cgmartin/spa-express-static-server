'use strict';

var uuid = require('uuid');
var cookieName = 'SessionId';

module.exports = function sessionId(maxAge) {
    maxAge = maxAge || 2 * 60 * 60 * 1000; // 2 hours
    return function(req, res, next) {
        var sessionId = req.cookies && req.cookies[cookieName];
        if (!sessionId) {
            sessionId = uuid.v1();
        }
        req.sessionId = sessionId;
        res.cookie(cookieName, sessionId, { path: '/', maxAge: maxAge });
        next();
    };
};
