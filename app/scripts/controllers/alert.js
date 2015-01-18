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

AlertCtrl.$inject = ['$scope', '$routeParams', 'AlertService', '$location', 'alert'];
function AlertCtrl($scope, $routeParams, AlertService, $location, alert) {
    window.scope = $scope;

    $scope.editable = false;
    $scope.loading = false;
    $scope.error = false;

    activate();
    $scope.editAlert = editAlert;
    $scope.cancelAlert = cancelAlert;
    $scope.deleteAlert = deleteAlert;
    $scope.saveAlert = saveAlert;

    function activate() {
        $scope.alert = alert;
        var id = $routeParams.alertId !== 'new'
            ? $routeParams.alertId
            : undefined;
        if (!id) {
            editAlert();
        }
    }

    function editAlert() {
        $scope.editable = true;
        $scope.alert.$old = angular.copy($scope.alert);
    }

    function cancelAlert() {
        $scope.editable = false;
        $scope.alert = $scope.alert.$old;
        delete['$scope.alert.$old'];
    }

    function deleteAlert(id) {
        AlertService.delete(id)
            .then(successCallback)
            .catch(errorCallback);

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

        var id = $routeParams.alertId !== 'new'
            ? $routeParams.alertId
            : undefined;
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