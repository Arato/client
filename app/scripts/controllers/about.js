'use strict';

/**
 * @ngdoc function
 * @name aratoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the aratoApp
 */
angular.module('aratoApp')
    .controller('AboutCtrl', AboutCtrl)

AboutCtrl.$inject = ['$scope'];
function AboutCtrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}