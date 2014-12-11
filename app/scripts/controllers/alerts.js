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
        total_count : 0,
        current_page: 1
    };

    activate();
    $scope.deleteAlert = deleteAlert;

    $scope.$watch('pagination.current_page', updateAlerts);

    function activate() {
        $scope.seqNumber = localStorage.getItem('seqNumber') ?
                           JSON.parse(localStorage.getItem('seqNumber')) : 0;
    }

    function deleteAlert(id) {
        AlertService.delete(id)
            .then(successCallback)
            .catch(errorCallback);

        function successCallback() {
            var alert = $scope.alerts.find(function (a) {
                return a.id === id;
            });
            $scope.alerts.remove(alert)
        }

        function errorCallback(error) {
            throw new Error(error);
        }
    }


    function updateAlerts() {
        var params = {
            page: $scope.pagination.current_page
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
}