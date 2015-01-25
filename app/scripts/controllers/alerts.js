'use strict';

/**
 * @ngdoc function
 * @name aratoApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the aratoApp
 */
angular.module('aratoApp')
    .controller('AlertsCtrl', AlertsCtrl);

AlertsCtrl.$inject = ['$scope', '$rootScope', 'AlertService', 'ProfileService', '$cookieStore', '$location', 'alerts'];
function AlertsCtrl($scope, $rootScope, AlertService, ProfileService, $cookieStore, $location, alerts) {
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

    function activate() {
        $scope.alerts = alerts.data;
        $scope.pagination = alerts.paginate;

        $scope.seqNumber = $rootScope.authUser.sequence_number;

        var lastId = alerts.data.map('id').max();
        var data = {
            sequence_number : lastId
        };

        ProfileService.save($rootScope.authUser.id, data)
            .then(function (user) {
                updateSequenceNumber(user.sequence_number);
            });
    }

    function updateAlerts(newPage) {
        if (newPage) {
            $location.search('page', newPage);
        }
    }

    function showAlert(alert) {
        $location.search({});
        $location.path('alerts/' + alert.id);
    }

    function updateSequenceNumber(seqNumber) {
        $rootScope.authUser.sequence_number = seqNumber;
        $cookieStore.put('authUser', $rootScope.authUser);
    }
}