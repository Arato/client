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
    $scope.$watch('pagination.current_page', updateAlerts);

    function activate() {
        $scope.seqNumber = localStorage.getItem('seqNumber') ?
                           JSON.parse(localStorage.getItem('seqNumber')) : 0;
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