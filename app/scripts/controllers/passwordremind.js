'use strict';

/**
 * @ngdoc function
 * @name aratoappApp.controller:PasswordremindCtrl
 * @description
 * # PasswordremindCtrl
 * Controller of the aratoappApp
 */
angular.module('aratoappApp')
    .controller('PasswordRemindCtrl', PasswordRemindCtrl);

PasswordRemindCtrl.$inject = ['$scope'];
function PasswordRemindCtrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}
