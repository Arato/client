'use strict';

/**
 * @ngdoc function
 * @name aratoappApp.controller:AlertCtrl
 * @description
 * # AlertCtrl
 * Controller of the aratoappApp
 */
angular.module('aratoappApp')
    .controller('AlertCtrl', AlertCtrl);

AlertCtrl.$inject = ['$scope', '$routeParams', 'AlertService', '$location'];
function AlertCtrl($scope, $routeParams, AlertService, $location) {
    window.scope = $scope;

    $scope.editable = false;
    $scope.loading = false;
    $scope.error = false;

    activate();
    $scope.edit = editAlert;
    $scope.delete = deleteAlert;
    $scope.saveAlert = saveAlert;


    function activate() {
        if (!$routeParams.alertId) {
            $scope.editable = true;
            $scope.alert = {};
        }
        else {
            AlertService.show($routeParams.alertId)
                .then(successCallback)
                .catch(errorCallback);
        }
        function successCallback(result) {
            console.log(result);
            $scope.alert = result;
        }

        function errorCallback(error) {
            if (error.status === 404) {
                $location.path("404.html");
            }
            throw new Error(error);
        }
    }

    function editAlert() {
        $scope.editable = true;
    }

    function deleteAlert(id) {
        AlertService.delete(id)
            .then(successCallback)
            .catch(errorCallback);

        function successCallback() {
            $location.path("/");
        }

        function errorCallback(error, status) {
            throw new Error(error);
        }
    }

    function saveAlert() {
        $scope.loading = true;
        $scope.error = false;

        var id = $routeParams.alertId !== 'new' ? $routeParams.alertId : undefined;
        var data = $scope.alert;
        AlertService.save(id, data)
            .then(successCallback)
            .catch(errorCallback)
            .finally(finallyFn);

        function successCallback(result) {
            $scope.alert = result.alerts;
            $scope.editable = false;
        }

        function errorCallback(error) {
            $scope.error = true;
            throw new Error(error);
        }

        function finallyFn() {
            $scope.loading = false;
        }
    }
}
