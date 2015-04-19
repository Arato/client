'use strict';

/**
 * @ngdoc function
 * @name aratoApp.controller:NotificationsCtrl
 * @description
 * # NotificationCtrl
 * Controller of the aratoApp
 */
angular.module('aratoApp')
    .controller('NotificationsCtrl', NotificationsCtrl);

NotificationsCtrl.$inject = ['$scope', 'ENV', 'NotificationService'];
function NotificationsCtrl($scope, ENV, NotificationService) {

    var socket = io.connect(ENV.nodePush);

    activate();

    function activate() {
        $scope.notifications = [];

        NotificationService.index()
            .then(function (response) {
                $scope.notifications = response.data;
            });
    }


    //
    // TODO :: check for duplicate
    // because NotificationService.index() is asynchronous
    // socket.on() can catch a duplicated Notification
    //
    socket.on('alert.created', function (notification) {
        console.log('alert.created', notification);
        $scope.$apply(function () {
            $scope.notifications.push(notification);
        });
    });

    socket.on('alert.updated', function (notification) {
        console.log('alert.updated', notification);
        $scope.$apply(function () {
            $scope.notifications.push(notification);
        });
    });

    socket.on('alert.deleted', function (notification) {
        console.log('alert.deleted', notification);
        $scope.$apply(function () {
            $scope.notifications.push(notification);
        });
    });
}
