'use strict';

// Example: How to use the static server with custom config
var server = require('./src/server');
//var server = require('spa-static-server');
server.start({
    webRootPath: './src/test/web-root',
    spaBoot:     require('./src/test/spa-boot'),
    sslKeyFile:  './src/test/keys/60638403-localhost.key',
    sslCertFile: './src/test/keys/60638403-localhost.cert'
});

// Use environment variables for other options:
//   NODE_ENV=production STATIC_SSL=1 STATIC_PORT=443 node start.js
