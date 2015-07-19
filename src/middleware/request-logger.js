'use strict';
var bunyan = require('bunyan');
var cookie = require('cookie');
var uuid = require('uuid');
var _ = require('lodash');
var path = require('path');

module.exports = function requestLogger(options) {
    options = _.merge({
        requestIdHeader: 'x-request-id',
        conversationIdHeader: 'x-conversation-id',
        conversationIdCookieName: 'ConversationId'
    }, options);

    var logger = options.logger || createLogger();

    return function(req, res, next) {
        var startTime = Date.now();

        // Parse cookies
        var cookies = req.headers.cookie;
        if (cookies) {
            req.cookies = cookie.parse(cookies);
        }

        // create child logger with custom tracking ids
        req.log = logger.child({
            reqId: getRequestId(req, res, options.requestIdHeader),
            conversationId: getConversationId(req, res, options)
        });

        res.on('finish', function responseSent() {
            if (req.skipRequestLog) { return; }
            req.log.info(createLogMeta(req, res, startTime), 'request');
        });

        next();
    };
};

function createLogMeta(req, res, startTime) {
    return {
        method: req.method,
        url: req.url,
        httpVersion: getHttpVersion(req),
        statusCode: res.statusCode,
        contentLength: res['content-length'],
        referrer: getReferrer(req),
        userAgent: req.headers['user-agent'],
        remoteAddress: getIp(req),
        duration: Date.now() - startTime
    };
}

function createLogger() {
    var pkg = require(path.resolve('package.json'));
    return bunyan.createLogger({
        name: pkg.name
    });
}

function getRequestId(req, res, headerName) {
    var reqId = req.headers[headerName] || uuid.v4();
    res.setHeader(headerName, reqId);
    return reqId;
}

/**
 * Create a "conversation" identifier to track requests per browser session
 */
function getConversationId(req, res, options) {
    var cookieName = options.conversationIdCookieName;
    var headerName = options.conversationIdHeader;
    var conversationId = req.headers[headerName] || req.cookies && req.cookies[cookieName];
    if (!conversationId) {
        conversationId = uuid.v1();
    }
    req.conversationId = conversationId;
    res.cookie(cookieName, conversationId, { path: '/' });
    return conversationId;
}

function getIp(req) {
    return req.ip ||
        req._remoteAddress ||
        (req.connection && req.connection.remoteAddress) ||
        undefined;
}

function getHttpVersion(req) {
    return req.httpVersionMajor + '.' + req.httpVersionMinor;
}

function getReferrer(req) {
    return req.headers.referer || req.headers.referrer;
}
