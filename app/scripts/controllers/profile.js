'use strict';

/**
 * @ngdoc function
 * @name aratoApp.controller:ProfilectrlCtrl
 * @description
 * # ProfilectrlCtrl
 * Controller of the aratoApp
 */
angular.module('aratoApp')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$rootScope', 'ProfileService', '$location'];
function ProfileCtrl($scope, $rootScope, ProfileService, $location) {

    activate();
    $scope.updateProfile = updateProfile;
    $scope.updatePassword = updatePassword;

    function activate() {
        ProfileService.show($rootScope.authUser.id)
            .then(successCallback)
            .catch(errorCallback);

        function successCallback(result) {
            $scope.user = result.data;
        }

        function errorCallback(error) {
            if (error.status === 404) {
                $location.path("404.html");
            }
            throw new Error(error.reason);
        }
    }

    function updateProfile() {
        $scope.loadingProfile = true;
        save();
    }

    function updatePassword() {
        $scope.loadingPassword = true;
        save();
    }

    function save() {
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
        $scope.loadingProfile = false;
        $scope.loadingPassword = false;
    }
}
