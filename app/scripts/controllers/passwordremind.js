'use strict';

/**
 * @ngdoc function
 * @name aratoappApp.controller:PasswordremindCtrl
 * @description
 * # PasswordremindCtrl
 * Controller of the aratoappApp
 */
angular.module('aratoappApp')
    .controller('PasswordRemindCtrl', PasswordRemindCtrl);

PasswordRemindCtrl.$inject = ['$scope', 'PasswordService', '$location'];
function PasswordRemindCtrl($scope, PasswordService, $location) {

    activate();
    $scope.remind = remind;

    function activate() {
        $scope.loading = false;
        $scope.error = false;
    }

    function remind() {
        $scope.loading = true;
        $scope.error = false;

        PasswordService.remind($scope.email)
            .then(successCallback)
            .catch(errorCallback)
            .finally(finallyFn);

        function successCallback() {
            $location.path("/password/reset");
        }

        function errorCallback(error) {
            $scope.error = true;
            $scope.errorMessage = error.message;
            throw new Error(error.message);
        }

        function finallyFn() {
            $scope.loading = false;
        }
    }
}
