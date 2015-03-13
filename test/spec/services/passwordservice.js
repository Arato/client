'use strict';

describe('Service: PasswordService', function () {

    // instantiate service
    var PasswordService;
    var $httpBackend;
    var $rootScope;
    var RouteService;

    beforeEach(function () {
        // load the service's module
        module('aratoApp');

        inject(function (_PasswordService_, _$httpBackend_, _$rootScope_, _RouteService_) {
            PasswordService = _PasswordService_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            RouteService = _RouteService_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    //
    // REMIND
    //

    it('should do send mail to reset password', function () {
        $httpBackend
            .whenPOST(RouteService.passwordRemind)
            .respond(204);

        var isSent = false;
        PasswordService.remind("validemail@email.com")
            .then(function () {
                isSent = true;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(isSent).toBeTruthy();
    });

    it('should fail if the email is not in a valid format', function () {
        $httpBackend
            .whenPOST(RouteService.passwordRemind)
            .respond(400, {
                "error" : {
                    "message"     : "There is an error.",
                    "status_code" : 400
                }
            });

        var error = false;
        PasswordService.remind("invalidemail@email")
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(400);
    });

    it('should fail if the email does not exist', function () {
        $httpBackend
            .whenPOST(RouteService.passwordRemind)
            .respond(404, {
                "error" : {
                    "message"     : "User does not exist",
                    "status_code" : 404
                }
            });

        var error = false;
        PasswordService.remind("doesnotexists@email.com")
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(404);
    });

    //
    // RESET
    //

    it('should reset password', function () {
        $httpBackend
            .whenPOST(RouteService.passwordReset)
            .respond(204);

        var isSent = false;
        PasswordService.reset("validemail@email.com", "password", "password", "1234")
            .then(function () {
                isSent = true;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(isSent).toBeTruthy();
    });

    it('should fail reset if invalid parameters', function () {
        $httpBackend
            .whenPOST(RouteService.passwordReset)
            .respond(400, {
                "error" : {
                    "message"     : "Invalid password",
                    "status_code" : 400
                }
            });

        var error = false;
        PasswordService.reset("email@email.com", "password", "pass", "1234")
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(400);
    });

    it('should fail reset if the email does not exist', function () {
        $httpBackend
            .whenPOST(RouteService.passwordReset)
            .respond(404, {
                "error" : {
                    "message"     : "User does not exist",
                    "status_code" : 404
                }
            });

        var error = false;
        PasswordService.reset("doesnotexists@email.com", "password", "password", "1234")
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(404);
    });
});
