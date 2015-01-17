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

AlertsCtrl.$inject = ['$scope', '$rootScope', 'AlertService', 'ProfileService', '$cookieStore', '$location'];
function AlertsCtrl($scope, $rootScope, AlertService, ProfileService, $cookieStore, $location) {
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
        $scope.seqNumber = $rootScope.authUser.sequence_number;
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

            var lastId = results.alerts.map('id').max();
            var data = {
                sequence_number : lastId
            };
            ProfileService.save($rootScope.authUser.id, data)
                .then(function (user) {
                    updateSequenceNumber(user.sequence_number);
                });
        }
    }

    function catchCallback(error) {
        throw new Error(error);
    }


    function showAlert(alert) {
        $location.path('alerts/' + alert.id);
    }

    function updateSequenceNumber(seqNumber) {
        $rootScope.authUser.sequence_number = seqNumber;
        $cookieStore.put('authUser', $rootScope.authUser);
    }
}