'use strict';

/**
 * @ngdoc function
 * @name aratoappApp.controller:ProfilectrlCtrl
 * @description
 * # ProfilectrlCtrl
 * Controller of the aratoappApp
 */
angular.module('aratoappApp')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$rootScope', 'ProfileService', '$location'];
function ProfileCtrl($scope, $rootScope, ProfileService, $location) {

    activate();
    $scope.save = save;

    function activate() {
        ProfileService.show($rootScope.authUser.id)
            .then(successCallback)
            .catch(errorCallback);

        function successCallback(result) {
            $scope.user = result;
        }

        function errorCallback(error) {
            if (error.status === 404) {
                $location.path("404.html");
            }
            throw new Error(error.reason);
        }
    }

    function save() {
        $scope.loading = true;
        $scope.error = false;

        var id = $rootScope.authUser.id;
        var data = $scope.user;
        ProfileService.save(id, data)
            .then(successCallback)
            .catch(errorCallback)
            .finally(finallyFn);

        function successCallback() {
            $location.path("/login");
            $scope.editable = false;
        }

        function errorCallback(error) {
            $scope.error = true;
            var messages = Object.keys(error.message)
                .map(function (key) {
                    return error.message[key];
                })
                .flatten();
            $scope.errorMessage = messages;
            throw new Error(messages);
        }
    }

    function finallyFn() {
        $scope.loading = false;
    }
}
