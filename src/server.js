'use strict';

var fs = require('fs');
var staticCfg = require('./config');
var app = require('./app');
var https = require('https');
var http = require('http');

if (!staticCfg.isBehindProxy && staticCfg.isSslEnabled) {
    // Secure https
    var sslOptions = {
        key:  fs.readFileSync(staticCfg.sslKeyFile),
        cert: fs.readFileSync(staticCfg.sslCertFile)
    };
    var sslServer = https.createServer(sslOptions, app);
    sslServer.listen(staticCfg.port, createListenCb(sslServer));

} else {
    // Insecure http
    var insecureServer = http.createServer(app);
    insecureServer.listen(staticCfg.port, createListenCb(insecureServer));
}

function createListenCb(server) {
    return function() {
        var host = server.address().address;
        var port = server.address().port;
        var scheme = (server instanceof https.Server) ? 'https' : 'http';
        console.log('spa-static-server listening at %s://%s:%s', scheme, host, port)
    }
}
