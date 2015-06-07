'use strict';

var uuid = require('uuid');
var cookieName = 'SessionId';

/**
 * Create a "session" identifier to track requests per usage session.
 * Client will extend the timeout age upon mouse events and SPA app usage.
 */
module.exports = function sessionId(maxAge) {
    maxAge = maxAge || 2 * 60 * 1000; // 20 mins
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
