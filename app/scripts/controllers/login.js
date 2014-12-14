'use strict';

/**
 * @ngdoc function
 * @name aratoappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the aratoappApp
 */
angular.module('aratoappApp')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', 'AuthService', '$location', 'UserService'];
function LoginCtrl($scope, AuthService, $location, UserService) {

    activate();
    $scope.login = login;

    function activate() {
        AuthService.clearCredentials();
        UserService.emptyUsers();

        $scope.loading = false;
        $scope.error = false;
    }

    function login() {
        $scope.loading = true;
        $scope.error = false;

        AuthService.login($scope.email, $scope.password)
            .then(successCallback)
            .catch(errorCallback)
            .finally(finallyFn);

        function successCallback() {
            UserService.fetchUsers();
            $location.path("/alerts");
        }

        function errorCallback(error) {
            $scope.error = true;
            throw new Error(error.message);
        }

        function finallyFn() {
            $scope.loading = false;
        }
    }
}
