'use strict';

/**
 * @ngdoc function
 * @name aratoappApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the aratoappApp
 */
angular.module('aratoappApp')
    .controller('AlertsCtrl', AlertsCtrl);

AlertsCtrl.$inject = ['$scope', 'AlertService'];
function AlertsCtrl($scope, AlertService) {
    window.scope = $scope;

    $scope.pagination = {
        total_count  : 0,
        current_page : 1
    };

    $scope.editable = false;
    $scope.loading = false;
    $scope.error = false;

    activate();
    $scope.$watch('pagination.current_page', updateAlerts);
    $scope.showAlert = showAlert;
    $scope.addAlert = addAlert;
    $scope.editAlert = editAlert;
    $scope.cancelAlert = cancelAlert;
    $scope.deleteAlert = deleteAlert;
    $scope.saveAlert = saveAlert;

    function activate() {
        $scope.seqNumber = localStorage.getItem('seqNumber') ?
                           JSON.parse(localStorage.getItem('seqNumber')) : 0;
    }

    function updateAlerts() {
        var params = {
            page : $scope.pagination.current_page
        };

        AlertService.index(params)
            .then(thenCallback)
            .catch(catchCallback);

        function thenCallback(results) {
            $scope.alerts = results.alerts;
            $scope.pagination = results.paginate;

            localStorage.setItem('seqNumber', $scope.alerts.map('id').max());
        }

        function catchCallback(error) {
            throw new Error(error);
        }
    }

    function showAlert(alert) {
        $scope.activeAlert = alert;
    }

    function addAlert() {
        $scope.activeAlert = {
            title   : "",
            price   : 0,
            content : ""
        };
        editAlert();
    }

    // TODO copy activeAlert to update it
    function editAlert() {
        $scope.editable = true;
    }

    function cancelAlert() {
        $scope.editable = false;
        if (!$scope.activeAlert.id) {
            $scope.activeAlert = undefined;
        }
    }

    function deleteAlert(alert) {
        AlertService.delete(alert.id)
            .then(successCallback)
            .catch(errorCallback);

        function successCallback() {
            $scope.alerts.remove(alert);
            $scope.activeAlert = undefined;
        }

        function errorCallback(error) {
            throw new Error(error);
        }
    }

    function saveAlert(alert) {
        $scope.loading = true;
        $scope.error = false;

        var id = alert.id !== 'new' ? alert.id : undefined;
        var data = alert;
        AlertService.save(id, data)
            .then(successCallback)
            .catch(errorCallback)
            .finally(finallyFn);

        function successCallback(result) {
            var savedAlert = result.alerts;
            var alert = $scope.alerts.find(function (a) {
                return a.id === result.alerts.id;
            });
            // TODO update the right value
            if (alert) {
                alert = savedAlert;
            }
            else {
                $scope.alerts.push(savedAlert);
            }
            $scope.activeAlert = savedAlert;
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