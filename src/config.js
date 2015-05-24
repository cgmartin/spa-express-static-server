'use strict';

module.exports = {
    webRootPath: process.env.STATIC_WEBROOT || './src/test/web-root',
    isCompressionEnabled: (process.env.NODE_ENV === 'production'),
    instanceId: process.env.STATIC_INSTANCE || '1',
    sessionMaxAge: parseInt(process.env.STATIC_SESSION_MAXAGE || 7200000), // 2 hours
    spaBootFile: process.env.STATIC_SPA_BOOT_FILE || './src/test/spa-boot.js',

    // SSL Settings
    isBehindProxy: (process.env.STATIC_REV_PROXY === '1'),
    port: parseInt(process.env.STATIC_PORT || process.env.PORT || 8000),
    isSslEnabled: (process.env.STATIC_SSL === '1'),
    sslKeyFile: process.env.STATIC_SSL_KEY || 'src/test/keys/60638403-localhost.key',
    sslCertFile: process.env.STATIC_SSL_CERT || 'src/test/keys/60638403-localhost.cert',
    hsts: {
        maxAge: 7776000000, // ninety days in ms
        includeSubdomains: true,
        preload: true
    }
};

