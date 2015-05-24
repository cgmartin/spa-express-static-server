'use strict';

module.exports = {
    webRootPath: process.env.STATIC_WEBROOT || './src/test/web-root',
    isCompressionEnabled: (process.env.NODE_ENV === '1'),
    instanceId: process.env.STATIC_INSTANCE || '1',
    sessionMaxAge: parseInt(process.env.STATIC_SESSION_MAXAGE || 7200000), // 2 hours

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
    },

    // SPA Settings
    spaBoot: {
        isDebugInfoEnabled: (process.env.NODE_ENV !== 'production'),
        isLogDebugEnabled: (process.env.NODE_ENV !== 'production'),
        isHtml5ModeEnabled: true,
        serverLogging: {
            isLoggingEnabled: true,
            loggingLevel: 2,
            loggingInterval: 120000,
            maxBufferSize: 1000,
            excludeTypes: [],
            isConsoleLogEnabled: (process.env.NODE_ENV !== 'production')
        },
        preferredLanguage: 'en',
        apiBaseUrl: '',
        isStubsEnabled: (process.env.NODE_ENV !== 'production'),
        notificationsMaximumOpen: 2,
        supportedLanguages: ['en', 'fr']
    }
};

