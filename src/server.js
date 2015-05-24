'use strict';

var fs = require('fs');
var _ = require('lodash');
var staticCfg = require('./config');
var https = require('https');
var http = require('http');

module.exports = {
    start: startServer
};

function startServer(options) {
    options = _.merge({}, staticCfg, options);
    var app = require('./app')(options);

    if (!options.isBehindProxy && options.isSslEnabled) {
        // Secure https
        var sslOptions = {
            key:  fs.readFileSync(options.sslKeyFile),
            cert: fs.readFileSync(options.sslCertFile)
        };
        var sslServer = https.createServer(sslOptions, app);
        sslServer.listen(options.port, createListenCb(sslServer));

    } else {
        // Insecure http
        var insecureServer = http.createServer(app);
        insecureServer.listen(options.port, createListenCb(insecureServer));
    }

    function createListenCb(server) {
        return function() {
            var host = server.address().address;
            var port = server.address().port;
            var scheme = (server instanceof https.Server) ? 'https' : 'http';
            console.log('spa-static-server listening at %s://%s:%s', scheme, host, port);
        };
    }
}
