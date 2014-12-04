'use strict';

/**
 * @ngdoc directive
 * @name aratoappApp.directive:password
 * @description
 * # password
 */
angular.module('aratoappApp')
    .directive('password', password);

function password() {
    var directive = {
        templateUrl: 'scripts/directives/password.html',
        restrict   : 'E',
        link       : postLink,
        replace    : true,
        scope      : {
            ngModel    : '=',
            placeholder: '@?'
        }
    };
    return directive;

    function postLink(scope, element, attrs) {
        scope.visibility = false;

        activate();

        function activate() {
        };

        scope.toggleVisibility = toggleVisibility;

        function toggleVisibility() {
            scope.visibility = !scope.visibility;
        }
    }
}
