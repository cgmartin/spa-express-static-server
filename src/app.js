'use strict';

var path = require('path');
var staticCfg = require('./config');
var express = require('express');
var helmet = require('helmet');
var enforceSsl = require('express-enforces-ssl');
var morgan = require('morgan');
var compression = require('compression');
var serveStatic = require('serve-static');
var errors = require('./errors');

var app = module.exports = express();

if (staticCfg.isBehindProxy) {
    // http://expressjs.com/api.html#trust.proxy.options.table
    app.enable('trust proxy');
}

app.use(morgan(staticCfg.logFormat)); // request logging

// Security middleware
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
if (staticCfg.isSslEnabled) {
    app.use(helmet.hsts(staticCfg.hsts));
    app.use(enforceSsl());
}

if (staticCfg.isCompressionEnabled) {
    app.use(compression({ threshold: 4000 }));
}
app.use(serveStatic(staticCfg.webRootPath, { index: false, maxAge: 0 })); // TODO: cache-busting and far-future

//app.use('/api', function(req, res, next) {
//    // Bail early if api request
//    next(new errors.NotFoundError());
//});

// SPA catch-all
app.use(function(req, res, next) {
    // Bail early if xhr request
    if (req.xhr) { return next(); }

    // Bail early if request is for a file with extension
    // (if existed, it would have been caught by serveStatic)
    if (path.extname(req.url)) { return next(); }

    // Send index for all routes
    res.sendFile(path.resolve(path.join(staticCfg.webRootPath, 'index.html')));
});

// 404 catch-all
app.use(function(req, res, next) {
    next(new errors.NotFoundError());
});

// Error handler
app.use(function(err, req, res, next) {
    if (err.headers) {
        res.set(err.headers);
    }
    res
        .status(err.status || 500)
        .send(err.message);
});
