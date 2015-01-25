'use strict';

describe('Controller: AlertsCtrl', function () {

    // load the controller's module
    beforeEach(module('aratoApp'));

    var AlertsCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AlertsCtrl = $controller('AlertsCtrl', {
            $scope: scope
        });
    }));

    it('should get alerts', function () {
        expect(scope.pagination.total_count).toBe(0);
        expect(scope.pagination.current_page).toBe(1);
    });
});
