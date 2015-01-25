'use strict';

/**
 * @ngdoc directive
 * @name aratoApp.directive:maxLengthTitle
 * @description
 * # maxLengthTitle
 */
angular.module('aratoApp')
    .directive('maxLengthTitle', maxLengthTitle);

maxLengthTitle.$inject = [];
function maxLengthTitle() {
    var directive = {
        require : 'ngModel',
        restrict: 'A',
        link    : postLink
    };

    return directive;

    function postLink(scope, element, attrs, ngModelCtrl) {
        scope.$watch(function () {
            return ngModelCtrl.$modelValue;
        }, checkLength);

        function checkLength(newValue, oldValue) {
            var tooLong = newValue && newValue.length > 20;
            ngModelCtrl.$setValidity('maxLength', !tooLong);

            if (tooLong) {
                element.parents('.form-group').addClass('has-error');
            }
            else {
                element.parents('.form-group').removeClass('has-error');
            }
        }
    }
}