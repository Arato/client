'use strict';

describe('Controller: PasswordresetCtrl', function () {

    // load the controller's module
    beforeEach(module('aratoApp'));

    var PasswordresetCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PasswordresetCtrl = $controller('PasswordResetCtrl', {
            $scope : scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        //expect(scope.awesomeThings.length).toBe(3);
    });
});