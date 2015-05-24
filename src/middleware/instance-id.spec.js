/* jshint -W030 */
'use strict';
var mockery = require('mockery');
var expect  = require('chai').expect;
var sinon   = require('sinon');

describe('Server application', function() {
    var moduleUnderTest = './instance-id';
    var module;

    before(function() {
        mockery.enable({
            //warnOnUnregistered: false,
            useCleanCache: true
        });
    });

    beforeEach(function() {
        // Load module under test for each test
        mockery.registerAllowable(moduleUnderTest, true);
        module = require(moduleUnderTest);
    });

    afterEach(function() {
        // Unload module under test each time to reset
        mockery.deregisterAllowable(moduleUnderTest);
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should set an instance id on the req object', function() {
        var middleware = module('INSTANCE_ID');
        var req = {};
        var next = sinon.spy();
        middleware(req, null, next);
        expect(req.instanceId).to.eql('INSTANCE_ID');
        expect(next.called).to.be.true;
    });

});
