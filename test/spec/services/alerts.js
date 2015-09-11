'use strict';

describe('Service: AlertService', function () {
    // instantiate service
    var AlertService;
    var $httpBackend;
    var $rootScope;
    var RouteService;

    beforeEach(function () {
        // load the service's module
        module('aratoApp');

        inject(function (_AlertService_, _$httpBackend_, _$rootScope_, _RouteService_) {
            AlertService = _AlertService_;
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
    // ALERTS
    //

    it('should get alerts', function () {
        var alerts = [];
        var paginate = {};

        $httpBackend
            .whenGET(RouteService.alerts)
            .respond({
                "data"     : [
                    {
                        "id"         : 2,
                        "title"      : "My second title",
                        "price"      : 10,
                        "user"       : {
                            "id"    : 2,
                            "email" : "email2@example.com"
                        },
                        "created_at" : "2015-01-07T22:44:17+0000",
                        "updated_at" : "2015-01-18T12:25:22+0000"
                    },
                    {
                        "id"         : 1,
                        "title"      : "My first title",
                        "price"      : 10,
                        "content"    : "My content",
                        "user"       : {
                            "id"    : 1,
                            "email" : "email@example.com"
                        },
                        "created_at" : "2015-01-07T10:44:17+0000",
                        "updated_at" : "2015-01-08T12:25:22+0000"
                    }
                ],
                "paginate" : {
                    "total_count"  : 2,
                    "total_pages"  : 1,
                    "current_page" : 1,
                    "limit"        : 20
                }
            });

        AlertService.index({})
            .then(function (result) {
                alerts = result.data;
                paginate = result.paginate;
            });
        $rootScope.$apply();
        $httpBackend.flush();

        expect(alerts.length).toBe(2);

        var firstAlert = alerts[0];

        expect(firstAlert.id).toBe(2);

        expect(paginate.total_count).toBe(2);
        expect(paginate.total_pages).toBe(1);
        expect(paginate.current_page).toBe(1);
        expect(paginate.limit).toBe(20);
    });

    //
    // SINGLE ALERT
    //

    it('should show a single alert', function () {
        var alert = {};

        $httpBackend
            .whenGET(RouteService.alerts + "/2")
            .respond(200, {
                "data" : {
                    "id"         : 2,
                    "title"      : "My second title",
                    "price"      : 10,
                    "user"       : {
                        "id"    : 2,
                        "email" : "email2@example.com"
                    },
                    "created_at" : "2015-01-07T22:44:17+0000",
                    "updated_at" : "2015-01-18T12:25:22+0000"
                }
            });

        AlertService.show(2)
            .then(function (result) {
                alert = result.data;
            });
        $rootScope.$apply();
        $httpBackend.flush();

        expect(alert.id).toBe(2);
        expect(alert.title).toBe("My second title");
    });

    it('should fail if an alert is not found', function () {
        var error = [];
        $httpBackend
            .whenGET(RouteService.alerts + "/0")
            .respond(404, {
                "error" : {
                    "message"     : "Alert does not exist.",
                    "status_code" : 404
                }
            });

        AlertService.show(0)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(404);
    });

    //
    // CREATION
    //

    it('should create a new alert given valid parameters', function () {
        $httpBackend
            .whenPOST(RouteService.alerts)
            .respond(201, {
                "data" : {
                    "id"    : 3,
                    "title" : "My title",
                    "price" : 10
                }
            });

        var data = {
            title : "My title",
            price : 10
        };

        var alert = {};
        AlertService.save(undefined, data)
            .then(function (result) {
                alert = result.data;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(alert.id).toBeDefined();
        expect(alert.title).toBe("My title");
        expect(alert.price).toBe(10);
    });

    it('should fail if new alert fails validation', function () {
        $httpBackend
            .whenPOST(RouteService.alerts)
            .respond(400, {
                "error" : {
                    "message"     : {
                        "price" : [
                            "The price field is required."
                        ]
                    },
                    "status_code" : 400
                }
            });

        var data = {
            title : "My title"
        };

        var error = {};
        AlertService.save(undefined, data)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(400);
        expect(error.message).toBeDefined();
    });

    it('should fail if the user is not authenticated for creation', function () {
        $httpBackend
            .whenPOST(RouteService.alerts)
            .respond(401, {
                "error" : {
                    "message"     : "Invalid credentials",
                    "status_code" : 401
                }
            });

        var data = {
            title : "My title"
        };

        var error = {};
        AlertService.save(undefined, data)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(401);
    });

    //
    // UPDATE
    //
    it('should update an alert given valid parameters', function () {
        $httpBackend
            .whenPUT(RouteService.alerts + "/1")
            .respond(201, {
                "data" : {
                    "id"         : 1,
                    "title"      : "My new title",
                    "price"      : 20,
                    "content"    : "Hello",
                    "user"       : {
                        "id"    : 2,
                        "email" : "email2@example.com"
                    },
                    "created_at" : "2015-01-07T22:44:17+0000",
                    "updated_at" : "2015-01-25T12:25:22+0000"
                }
            });

        var data = {
            title : "My new title",
            price : 20
        };

        var alert = {};
        AlertService.save(1, data)
            .then(function (result) {
                alert = result.data;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(alert.id).toBeDefined();
        expect(alert.title).toBe("My new title");
        expect(alert.price).toBe(20);
    });

    it('should fail if updated alert fails validation', function () {
        $httpBackend
            .whenPUT(RouteService.alerts + "/1")
            .respond(400, {
                "error" : {
                    "message"     : {
                        "price" : [
                            "The price field is required."
                        ]
                    },
                    "status_code" : 400
                }
            });

        var data = {
            title : "My title"
        };

        var error = {};
        AlertService.save(1, data)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(400);
        expect(error.message).toBeDefined();
    });

    it('should fail if the user is not authenticated for update', function () {
        $httpBackend
            .whenPUT(RouteService.alerts + "/1")
            .respond(401, {
                "error" : {
                    "message"     : "Invalid credentials",
                    "status_code" : 401
                }
            });

        var data = {
            title : "My title"
        };

        var error = {};
        AlertService.save(1, data)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(401);
    });

    it('should fail if the user is not authorized to update alert', function () {
        $httpBackend
            .whenPUT(RouteService.alerts + "/1")
            .respond(403, {
                "error" : {
                    "message"     : "Forbidden",
                    "status_code" : 403
                }
            });

        var data = {
            title : "My title"
        };

        var error = {};
        AlertService.save(1, data)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(403);
    });

    it('should fail if the updated alert does not exist', function () {
        $httpBackend
            .whenPUT(RouteService.alerts + "/1")
            .respond(404, {
                "error" : {
                    "message"     : "Alert does not exist.",
                    "status_code" : 404
                }
            });

        var data = {
            title : "My title"
        };

        var error = {};
        AlertService.save(1, data)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(404);
    });

    //
    // DELETION
    //
    it('should delete an alert', function () {
        $httpBackend
            .whenDELETE(RouteService.alerts + "/1")
            .respond(204);

        var isDeleted = false;
        AlertService.delete(1)
            .then(function () {
                isDeleted = true;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(isDeleted).toBeTruthy();
    });

    it('should fail if the user is not authenticated for update', function () {
        $httpBackend
            .whenDELETE(RouteService.alerts + "/1")
            .respond(401, {
                "error" : {
                    "message"     : "Invalid credentials",
                    "status_code" : 401
                }
            });

        var error = {};
        AlertService.delete(1)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(401);
    })

    it('should fail if the user is not authorized to delete alert', function () {
        $httpBackend
            .whenDELETE(RouteService.alerts + "/1")
            .respond(403, {
                "error" : {
                    "message"     : "Forbidden",
                    "status_code" : 403
                }
            });

        var error = {};
        AlertService.delete(1)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(403);
    });

    it('should fail if the deleted alert does not exist', function () {
        $httpBackend
            .whenDELETE(RouteService.alerts + "/1")
            .respond(404, {
                "error" : {
                    "message"     : "Alert does not exist",
                    "status_code" : 404
                }
            });

        var error = {};
        AlertService.delete(1)
            .catch(function (response) {
                error = response.error;
            });

        $rootScope.$apply();
        $httpBackend.flush();

        expect(error.status_code).toBe(404);
    });
});
