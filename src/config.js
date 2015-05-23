'use strict';

module.exports = {
    webRootPath: process.env.STATIC_WEB_ROOT || './web-root-test',
    isCompressionEnabled: (process.env.NODE_ENV === '1'),
    port: parseInt(process.env.STATIC_PORT || process.env.PORT || 8000),
    isSslEnabled: (process.env.STATIC_SSL === '1'),
    hsts: {
        maxAge: 7776000000, // ninety days in ms
        includeSubdomains: true,
        preload: true
    },
    isBehindProxy: (process.env.STATIC_REV_PROXY === '1'),
    logFormat: process.env.STATIC_LOGFMT || 'combined',
    showErrors: (process.env.STATIC_SHOW_ERRORS === '1'),

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

