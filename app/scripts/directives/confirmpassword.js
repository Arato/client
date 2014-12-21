'use strict';

/**
 * @ngdoc directive
 * @name aratoappApp.directive:confirmPassword
 * @description
 * # confirmPassword
 */
angular.module('aratoappApp')
    .directive('confirmPassword', confirmPassword);

function confirmPassword() {
    var directive = {
        templateUrl: 'scripts/directives/confirmpassword.html',
        require    : 'ngModel',
        restrict   : 'E',
        link       : postLink,
        scope      : {
            ngModel  : '=',
            toConfirm: '='
        }
    };
    return directive;

    function postLink(scope, element, attrs, ngModelCtrl) {
        scope.$watch('ngModel + toConfirm', watchForConfirmation, true);

        function watchForConfirmation() {
            var isValid = scope.toConfirm === scope.ngModel;
            ngModelCtrl.$setValidity('confirm', isValid);

            if (scope.confirmPasswordForm.password_confirmation) {
                scope.confirmPasswordForm.password_confirmation.$setValidity('confirm', isValid);
            }
        }
    }
}
