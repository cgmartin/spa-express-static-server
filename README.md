# spa-express-static-server

An opinionated static server library for Angular single page applications (SPAs).

[![Build Status](https://travis-ci.org/cgmartin/spa-express-static-server.svg?branch=master)](https://travis-ci.org/cgmartin/spa-express-static-server)
[![Dependency Status](https://david-dm.org/cgmartin/spa-express-static-server.svg)](https://david-dm.org/cgmartin/spa-express-static-server)
[![devDependency Status](https://david-dm.org/cgmartin/spa-express-static-server/dev-status.svg)](https://david-dm.org/cgmartin/spa-express-static-server#info=devDependencies)

## Synopsis

The spa-express-static-server is specifically meant as a reusable static file server
and Angular "HTML5 Mode" route handler. It could be replaced by Apache Web Server, Nginx, or other
static web servers. No web API/REST calls allowed here.

This static server project is meant to accompany a [SPA client](https://github.com/cgmartin/angular-spa-browserify-example)
and a set of separate Node.js microservices (REST webservice, Chat Server, Reverse Proxy).
It is designed with portability and scalability in mind (see [Twelve Factors](http://12factor.net/)).

Configuration options are passed in by the consumer or via environment variables at runtime.

## Quick Start / Usage

```bash
$ npm install spa-express-static-server --save
```

Create a `server.js` wrapper script, passing in your specific configuration options:
```js
// server.js
var staticServer = require('spa-express-static-server');
staticServer.start({
    webRootPath: './dist/web-root',
    spaBoot:     require('./spa-boot'),
    sslKeyFile:  './keys/my-domain.key',
    sslCertFile: './keys/my-domain.cert'
});
```

And run your `server.js` with optional runtime environment variables:
```bash
$ NODE_ENV=production STATIC_SSL=1 STATIC_PORT=443 node start.js
```

## Features

* Catch all non-file routes and forward to index.html for clients using AngularJS HTML5 mode.
* Security headers using [Helmet](https://github.com/helmetjs/helmet) middleware.
* Creates unique session and "conversation" (browser lifetime) id cookies, for use in correlating logs between services.
* Optional "SPA Boot Configuration" JSONP launcher, which provides runtime configuration for the client.
* Access logs in JSON format.

## Contributing

1. Install [Node.js](https://nodejs.org/download/)
1. Install Gulp: `npm -g i gulp`
1. Clone this repo
1. Install dependencies: `npm i`
1. Start the app in dev mode: `npm start`
1. Point browser to <http://localhost:3000/> and watch the console for server logs

After installation, the following actions are available:

* `npm start` : Runs in development mode, starting the server and a local webserver, running linting and unit tests, and restarting upon file changes.
* `npm test` : Runs JavaScript file linting and unit tests.
* `npm run watch` : Alternative development mode - does not run servers. Only runs linting and tests upon file changes.

## Folder Structure

```
├── coverage                 # Coverage reports
├── example                  # Example client assets for testing
└── src
    ├── middleware           # Express middleware
    ├── app.js               # Creates and configures an express app
    ├── config.js            # Configuration options
    ├── errors.js            # Error objects
    └── server.js            # Starts the express app with http or https on a port (entrypoint)
```

## Libraries & Tools

The functionality has been implemented by integrating the following 3rd-party tools and libraries:

 - [Express](https://github.com/strongloop/express): Fast, minimalist web framework for node
 - [Helmet](https://github.com/helmetjs/helmet): Secure Express apps with various HTTP headers
 - [Gulp](http://gulpjs.com/): Streaming build system and task runner
 - [Node.js](http://nodejs.org/api/): JavaScript runtime environment for server-side development
 - [Mocha](http://mochajs.org/): The fun, simple, flexible JavaScript test framework
 - [Chai](http://chaijs.com/): BDD/TDD assertion library for node and the browser
 - [Sinon](http://sinonjs.org/): Standalone test spies, stubs and mocks for JavaScript
 - [Mockery](https://github.com/mfncooper/mockery): Mock Node.js module dependencies during testing

## License

[MIT License](http://cgm.mit-license.org/)  Copyright © 2015 Christopher Martin
