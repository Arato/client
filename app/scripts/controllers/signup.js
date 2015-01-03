'use strict';

/**
 * @ngdoc function
 * @name aratoappApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the aratoappApp
 */
angular.module('aratoappApp')
    .controller('SignupCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });

angular.module('aratoappApp')
    .controller('SignupCtrl', SignupCtrl);


SignupCtrl.$inject = ['$scope', 'AuthService', '$location', 'UserService'];
function SignupCtrl($scope, AuthService, $location, UserService) {
    activate();
    $scope.signup = signup;

    function activate() {
        $scope.loading = false;
        $scope.error = false;
    }

    function signup() {
        $scope.loading = true;
        $scope.error = false;

        AuthService.signup($scope.email, $scope.password, $scope.password_confirmation)
            .then(successCallback)
            .catch(errorCallback)
            .finally(finallyFn);

        function successCallback() {
            AuthService.login($scope.email, $scope.password)
                .then(successLoginCallback)
                .catch(errorCallback)
                .finally(finallyFn);
        }

        function successLoginCallback() {
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