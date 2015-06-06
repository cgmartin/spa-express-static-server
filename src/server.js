'use strict';

var fs = require('fs');
var _ = require('lodash');
var staticCfg = require('./config');
var https = require('https');
var http = require('http');
var gracefulShutdown = require('./graceful-shutdown');

module.exports = function startServer(options) {
    options = _.merge({}, staticCfg, options);
    var app = require('./app')(options);
    var server;

    // Start a secure or insecure server (only one)
    if (!options.isBehindProxy && options.isSslEnabled) {
        // Secure https
        var sslOptions = {
            key:  fs.readFileSync(options.sslKeyFile),
            cert: fs.readFileSync(options.sslCertFile)
        };
        server = https.createServer(sslOptions, app);

    } else {
        // Insecure http
        server = http.createServer(app);
    }

    server.listen(options.port, function onListenComplete() {
        var host = server.address().address;
        var port = server.address().port;
        var scheme = (server instanceof https.Server) ? 'https' : 'http';
        console.info('static server listening at %s://%s:%s', scheme, host, port);
        gracefulShutdown(server);
    });

    return server;
};
