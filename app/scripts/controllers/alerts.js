'use strict';

/**
 * @ngdoc function
 * @name aratoApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the aratoApp
 */
angular.module('aratoApp')
    .controller('AlertsCtrl', AlertsCtrl)
    .controller('AddAlertModalCtrl', AddAlertModalCtrl);

AlertsCtrl.$inject = ['$scope', 'AlertService', '$modal'];
function AlertsCtrl($scope, AlertService, $modal) {
    var DEFAULT_ALERT = {
        id      : undefined,
        title   : "",
        price   : 0,
        content : ""
    };

    activate();

    $scope.$watch('pagination.current_page', updateAlerts);

    $scope.addAlert = addAlert;
    $scope.editAlert = editAlert;
    $scope.deleteAlert = deleteAlert;

    function activate() {
        $scope.pagination = {
            total_count  : 0,
            current_page : 1
        };
    }

    function updateAlerts() {
        var params = {
            page : $scope.pagination.current_page
        };

        // to prevent ngAnimate
        $scope.alerts = [];


        AlertService.index(params)
            .then(function (response) {
                $scope.alerts = response.data;
                $scope.pagination = response.paginate;
            })
            .finally(function () {
            });
    }

    function addAlert() {
        openAlertModal(DEFAULT_ALERT);
    }

    function editAlert(alert) {
        openAlertModal(alert);
    }

    function openAlertModal(alert) {
        var modalInstance = $modal.open({
            templateUrl : 'views/modals/addAlert.html',
            controller  : 'AddAlertModalCtrl',
            resolve     : {
                alert : function () {
                    return angular.copy(alert);
                }
            }
        });

        modalInstance.result.then(successCallback, errorCallback);

        function successCallback(alert) {
            addOrUpdate(alert);
        }

        function errorCallback() {
        }
    }

    function addOrUpdate(alert) {
        var alertIndex = $scope.alerts.findIndex(function (a) {
            return a.id === alert.id;
        });

        if (alertIndex >= 0) {
            $scope.alerts[alertIndex] = alert;
        }
        else {
            $scope.alerts.push(alert);
        }
    }

    function deleteAlert(alert) {
        bootbox.dialog({
            title   : "Alert removal",
            message : "Are you sure to delete <strong>" + alert.title + "</strong> ?",
            buttons : {
                success : {
                    label     : "Yes, delete",
                    className : "btn-danger",
                    callback  : function () {
                        AlertService.delete(alert.id)
                            .then(successCallback)
                            .catch(errorCallback);

                        function successCallback() {
                            updateAlerts();
                        }

                        function errorCallback(error) {
                            throw new Error(error);
                        }
                    }
                },
                danger  : {
                    label     : "No, cancel",
                    className : "btn-default"
                }
            }
        });
    }
}

AddAlertModalCtrl.$inject = ['$scope', '$modalInstance', 'alert', 'AlertService'];
function AddAlertModalCtrl($scope, $modalInstance, alert, AlertService) {
    activate();

    $scope.ok = ok;
    $scope.cancel = cancel;

    function activate() {
        $scope.alert = alert;
    }

    function ok() {
        $scope.loading = true;
        $scope.error = false;

        AlertService.save($scope.alert.id, $scope.alert)
            .then(successCallback)
            .catch(errorCallback)
            .finally(finallyFn);

        function successCallback(result) {
            $modalInstance.close(result.data);
        }

        function errorCallback(error) {
            $scope.error = true;
            throw new Error(error);
        }

        function finallyFn() {
            $scope.loading = false;
        }
    }

    function cancel() {
        $scope.alert = $scope.alert.$old;

        delete['$scope.alert.$old'];
        $modalInstance.dismiss('cancel');
    }
}
