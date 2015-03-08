'use strict';

describe('Controller: PasswordremindCtrl', function () {

    // load the controller's module
    beforeEach(module('aratoApp'));

    var PasswordremindCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PasswordremindCtrl = $controller('PasswordRemindCtrl', {
            $scope : scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        //expect(scope.awesomeThings.length).toBe(3);
    });
});
