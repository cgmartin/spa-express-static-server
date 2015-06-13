'use strict';

var fs = require('fs');
var _ = require('lodash');
var cfgDefaults = require('./config');
var https = require('https');
var http = require('http');
var gracefulShutdown = require('./lib/graceful-shutdown');
var createApp = require('./lib/app');

module.exports = function startServer(options) {
    options = _.merge({}, cfgDefaults, options);
    var app = createApp(options);
    var server;

    // Start a secure or insecure server (only one).
    // Call startServer multiple times for additional servers.
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

    // Limits maximum incoming headers count
    server.maxHeadersCount = options.maxHeadersCount;

    // Inactivity before a socket is presumed to have timed out
    server.timeout = options.serverTimeout;

    // Start listening on a port
    server.listen(options.port, function onListenComplete() {
        var host = server.address().address;
        var port = server.address().port;
        var scheme = (server instanceof https.Server) ? 'https' : 'http';
        console.info('static server listening at %s://%s:%s', scheme, host, port);
        if (options.isGracefulShutdownEnabled) {
            gracefulShutdown(server);
        }
    });

    return server;
};
