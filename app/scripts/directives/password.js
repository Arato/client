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
        require    : 'ngModel',
        templateUrl: 'scripts/directives/password.html',
        restrict   : 'E',
        link       : postLink,
        replace    : true,
        scope      : {
            ngModel    : '=ngModel',
            placeholder: '@?',
            name       : '@'
        }
    };
    return directive;

    function postLink(scope, element, attrs, ngModelCtrl) {
        scope.visibility = false;
        scope.ngModelCtrl = ngModelCtrl;

        activate();
        scope.toggleVisibility = toggleVisibility;

        function activate() {
        }

        function toggleVisibility() {
            scope.visibility = !scope.visibility;
            element.find('input').prop('type', scope.visibility ? 'text' : 'password');
        }
    }
}
