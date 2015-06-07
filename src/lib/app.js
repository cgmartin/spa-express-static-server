'use strict';

var path = require('path');
var express = require('express');
var helmet = require('helmet');
var enforceSsl = require('../middleware/enforce-ssl');
var conversationId = require('../middleware/conversation-id');
var sessionId = require('../middleware/session-id');
var instanceId = require('../middleware/instance-id');
var logging = require('../middleware/logging');
var spaCatchRoutes = require('../middleware/spa-catch-routes');
var errorHandler = require('../middleware/error-handler');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var serveStatic = require('serve-static');

var errors = require('./errors');

/**
 * Creates an express app with middleware appropriate for a static web server
 */
module.exports = function createApp(options) {
    var app = express();

    if (options.isBehindProxy) {
        // http://expressjs.com/api.html#trust.proxy.options.table
        app.enable('trust proxy');
    }

    // Logging requests
    app.use(logging());
    app.use(cookieParser());
    app.use(conversationId());
    app.use(sessionId(options.sessionMaxAge));
    app.use(instanceId(options.instanceId));

    // Security middleware
    app.use(helmet.hidePoweredBy());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    if (options.isSslEnabled) {
        app.use(helmet.hsts(options.hsts));
        app.use(enforceSsl());
    }

    // Compression settings
    if (options.isCompressionEnabled) {
        app.use(compression({threshold: 4000}));
    }

    // Provides runtime boot settings for the SPA.
    // Must come before serveStatic to intercept the file request.
    if (options.spaBoot) {
        app.get('/spa-boot.js', function(req, res) {
            res.jsonp(options.spaBoot);
        });
    }

    app.use(serveStatic(options.webRootPath, options.staticOptions));

    // SPA catch-all
    app.use(spaCatchRoutes(path.join(options.webRootPath, options.indexFile)));

    // 404 catch-all
    app.use(function(req, res, next) {
        next(new errors.NotFoundError());
    });

    // Error handler
    app.use(errorHandler(options));

    return app;
};
