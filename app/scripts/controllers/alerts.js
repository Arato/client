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

AlertsCtrl.$inject = ['$scope', 'AlertService', '$modal', 'ENV'];
function AlertsCtrl($scope, AlertService, $modal, ENV) {
    var DEFAULT_ALERT = {
        id      : undefined,
        title   : "",
        price   : 0,
        content : ""
    };

    var socket = io.connect(ENV.nodePush);

    socket.on('alert.created', function (response) {
        console.log('alert.created', response);

        // todo : only add if you are on the first page.
        // todo : check with the pagination limit
        $scope.$apply(function () {
            addOrUpdate(response.data);
        });
    });
    socket.on('alert.updated', function (response) {
        console.log('alert.updated', response);
        $scope.$apply(function () {
            addOrUpdate(response.data);
        });
    });

    socket.on('alert.deleted', function (response) {
        console.log('alert.deleted', response);
        $scope.$apply(function () {
            $scope.alerts.remove(function (a) {
                return a.id === response.data.id;
            });
        });
    });
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

        AlertService.index(params)
            .then(function (response) {
                $scope.alerts = response.data;
                $scope.pagination = response.paginate;
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
            console.info('Modal dismissed at: ' + new Date());
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
                            $scope.alerts.remove(function (a) {
                                return a.id === alert.id;
                            });
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
