'use strict';

describe('Service: passwordService', function () {

    // load the service's module
    beforeEach(module('aratoApp'));

    // instantiate service
    var passwordService;
    beforeEach(inject(function (_passwordService_) {
        passwordService = _passwordService_;
    }));

    it('should do something', function () {
        //expect(!!passwordService).toBe(true);
    });

});
