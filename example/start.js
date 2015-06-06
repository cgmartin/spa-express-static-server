'use strict';

// Example: How to use the static server with custom config
var server = require('../src');
//var server = require('spa-express-static-server');
server.start({
    spaBoot:     require('./spa-boot'),
    webRootPath: __dirname + '/web-root',
    sslKeyFile:  __dirname + '/keys/60638403-localhost.key',
    sslCertFile: __dirname + '/keys/60638403-localhost.cert'
});

// Use environment variables for other options:
//   NODE_ENV=production STATIC_SSL=1 STATIC_PORT=443 node start.js
