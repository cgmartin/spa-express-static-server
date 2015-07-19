0.0.12 / 2015-07-19
===================

- update: Provide a status endpoint for health checks. Enable with `config.statusRoute = '/status'`.

0.0.11 / 2015-06-21
===================

- fix: Improve graceful shutdown logic from spawning multiple timers

0.0.10 / 2015-06-13
===================

- update: Remove session tracking id

0.0.9 / 2015-06-13
==================

- update: Expose configuration option for graceful shutdown
- fix/update: Expose configuration option for gzip compression (was NODE_ENV="production")

0.0.8 / 2015-06-08
==================

- update: Added tuning options for http server (timeout and maxHeadersCount)
- update: Expose configurable compression middleware options
- fix: Session cookie maxAge default from 2 mins to 20 mins
- fix: Remove morgan node dependency

0.0.7 / 2015-06-08
==================

- update: Replaced morgan with bunyan logger

0.0.6 / 2015-06-07
==================

- fix: Relative file paths would cause res.sendFile error

0.0.5 / 2015-06-07
==================

- new: Support for custom 404/505 pages
- update: Additional commenting for internal source code, namely config options
- update: Change default session timeout from 2 hours to 20 mins

0.0.4
=====

This file was started after the release of 0.0.4.
