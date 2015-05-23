'use strict';

var staticCfg = require('./config');
var app = require('./app');

var server = app.listen(staticCfg.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('spa-static-server listening at http://%s:%s', host, port)
});
