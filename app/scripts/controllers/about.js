'use strict';

/**
 * @ngdoc function
 * @name aratoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the aratoApp
 */
angular.module('aratoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
