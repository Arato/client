'use strict';

describe('Service: AuthService', function () {
    // instantiate service
    var AuthService;
    var $httpBackend;
    var $rootScope;
    var RouteService;

    beforeEach(function () {
        // load the service's module
        module('aratoApp');

        inject(function (_AuthService_, _$httpBackend_, _$rootScope_, _RouteService_) {
            AuthService = _AuthService_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            RouteService = _RouteService_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should login with the right credentials', function () {
        var credentials = {
            email    : 'user1@email.com',
            password : 'password'
        };

        $httpBackend
            .whenPOST(RouteService.login)
            .respond({
                data : {
                    'id'              : 1,
                    'email'           : 'user1@email.com',
                    'sequence_number' : 0,
                    'authData'        : 'dXNlcjFAZW1haWwuY29tOnBhc3N3b3Jk'
                }
            });

        AuthService.login(credentials);
        $rootScope.$apply();
        $httpBackend.flush();

        expect($rootScope.authUser.id).toBe(1);
        expect($rootScope.authUser.email).toBe('user1@email.com');
        expect($rootScope.authUser.authData).toBeDefined();
    });

    it('should fail login', function () {
        var credentials = {
            email    : 'user1@email.com',
            password : 'password'
        };

        $httpBackend
            .whenPOST(RouteService.login)
            .respond(401, {
                "error" : {
                    "message"     : "Invalid credentials",
                    "status_code" : 401
                }
            });

        AuthService.login(credentials);
        $rootScope.$apply();
        $httpBackend.flush();

        expect($rootScope.authUser.id).toBeUndefined();
    });
});
