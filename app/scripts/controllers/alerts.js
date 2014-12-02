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

    }


    function updateAlerts() {
        var params = {
            page: $scope.pagination.current_page
        };

        AlertService.index(params)
            .then(function (response) {
                return response.data;
            })
            .then(function (alerts) {
                $scope.alerts = alerts.data;
                $scope.pagination = alerts.paginate;
            });
    }
}