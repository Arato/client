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
        if ($routeParams.alertId === 'new') {
            $scope.editable = true;
        }
        else {
            AlertService.show($routeParams.alertId)
                .success(successCallback)
                .error(errorCallback);
        }
        function successCallback(result) {
            $scope.alert = result.data;
        }

        function errorCallback(error) {
            throw new Error(error);
        }
    }

    function editAlert() {
        $scope.editable = true;
    }

    function deleteAlert() {
        AlertService.delete($routeParams.alertId)
            .success(successCallback)
            .error(errorCallback);

        function successCallback() {
            $location.path("/");
        }

        function errorCallback(error) {
            throw new Error(error);
        }
    }

    function saveAlert() {
        $scope.loading = true;
        $scope.error = false;

        var id = $routeParams.alertId !== 'new' ? $routeParams.alertId : undefined;
        var data = $scope.alert;

        AlertService.save(id, data)
            .success(successCallback)
            .error(errorCallback)
            .finally(finallyFn);

        function successCallback(result) {
            console.log("r", result);
            $scope.alert = result.data;
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
