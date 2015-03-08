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
    }

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
                $scope.alerts = response.alerts;
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
            console.log(alert);
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

        function errorCallback() {
            console.info('Modal dismissed at: ' + new Date());
        }
    }

    function deleteAlert(alert) {
        bootbox.dialog({
            title   : "Suppression de l'alerte",
            message : "Etes vous sûr de vouloir supprimer l'alerte <strong>" + alert.title + "</strong> ?",
            buttons : {
                success : {
                    label     : "Oui, supprimer",
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
                    label     : "Non, annuler",
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
            $modalInstance.close(result.alerts);
        }

        function errorCallback(error) {
            $scope.error = true;
            throw new Error(error);
        }

        function finallyFn() {
            $scope.loading = false;
        }
    };

    function cancel() {
        $scope.alert = $scope.alert.$old;

        delete['$scope.alert.$old'];
        $modalInstance.dismiss('cancel');
    };
}
