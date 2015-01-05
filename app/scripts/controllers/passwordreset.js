'use strict';

/**
 * @ngdoc function
 * @name aratoappApp.controller:PasswordresetCtrl
 * @description
 * # PasswordresetCtrl
 * Controller of the aratoappApp
 */
angular.module('aratoappApp')
    .controller('PasswordResetCtrl', PasswordResetCtrl);

PasswordResetCtrl.$inject = ['$scope', '$routeParams',];
function PasswordResetCtrl($scope, $routeParams) {
    console.log("token", $routeParams.token);
}
