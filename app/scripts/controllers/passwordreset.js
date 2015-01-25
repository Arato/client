'use strict';

/**
 * @ngdoc function
 * @name aratoApp.controller:PasswordresetCtrl
 * @description
 * # PasswordresetCtrl
 * Controller of the aratoApp
 */
angular.module('aratoApp')
    .controller('PasswordResetCtrl', PasswordResetCtrl);

PasswordResetCtrl.$inject = ['$scope', '$routeParams', 'PasswordService', 'AuthService', 'UserService', '$location'];
function PasswordResetCtrl($scope, $routeParams, PasswordService, AuthService, UserService, $location) {
    activate();
    $scope.resetPassword = resetPassword;

    function activate() {
        $scope.loading = false;
        $scope.error = false;
    }

    function resetPassword() {
        $scope.loading = true;
        $scope.error = false;

        PasswordService.reset($scope.user.email, $scope.user.password, $scope.user.password_confirmation, $routeParams.token)
            .then(successCallback)
            .catch(errorCallback)
            .finally(finallyFn);

        function successCallback() {
            AuthService.login($scope.user.email, $scope.user.password)
                .then(successLoginCallback)
                .catch(errorCallback);

            function successLoginCallback() {
                UserService.fetchUsers();
                $location.path("/alerts");
            }
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
