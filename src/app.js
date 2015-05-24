'use strict';

var path = require('path');
var express = require('express');
var helmet = require('helmet');
var enforceSsl = require('./middleware/enforce-ssl');
var conversationId = require('./middleware/conversation-id');
var sessionId = require('./middleware/session-id');
var instanceId = require('./middleware/instance-id');
var logging = require('./middleware/logging');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var serveStatic = require('serve-static');
var errors = require('./errors');

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
        app.get('/spa-boot.js', function (req, res) {
            res.jsonp(options.spaBoot);
        });
    }

    app.use(serveStatic(options.webRootPath, {
        index:  false,  // Fall through to SPA catch-all for index.html
        maxAge: 0      // TODO: cache-busting and far-future
    }));

    // SPA catch-all
    app.use(function (req, res, next) {
        // Bail early if xhr request.
        // Angular requires you to manually add the header to $http:
        // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        if (req.xhr) {
            return next();
        }

        // Bail early if request is for a file with extension.
        // If file existed it would have been caught by earlier serveStatic
        if (path.extname(req.url)) {
            return next();
        }

        // Send index for all routes
        res.sendFile(path.resolve(path.join(options.webRootPath, 'index.html')));
    });

    // 404 catch-all
    app.use(function (req, res, next) {
        next(new errors.NotFoundError());
    });

    // Error handler
    app.use(function (err, req, res, next) {
        if (err.headers) {
            res.set(err.headers);
        }
        res.status(err.status || 500).send(err.message);
    });

    return app;
}
