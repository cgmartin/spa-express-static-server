'use strict';

var uuid = require('uuid');
var cookieName = 'ConversationId';

module.exports = function conversationId() {
    return function(req, res, next) {
        var conversationId = req.cookies && req.cookies[cookieName];
        if (!conversationId) {
            conversationId = uuid.v1();
        }
        req.conversationId = conversationId;
        res.cookie(cookieName, conversationId, { path: '/' });
        next();
    };
};
