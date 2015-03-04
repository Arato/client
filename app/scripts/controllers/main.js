'use strict';

/**
 * @ngdoc function
 * @name aratoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aratoApp
 */
angular.module('aratoApp')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope'];
function MainCtrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}