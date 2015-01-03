'use strict';

angular.module('aratoappApp')
    .directive('animate', animate);

animate.$inject = ['$timeout'];
function animate($timeout) {
    var directive = {
        restrict: 'A',
        link    : postLink,
        scope   : {
            animate        : '=',
            animateStyle   : '@?',
            animateDuration: '@?'
        }
    };
    return directive;

    function postLink(scope, element) {
        var style = angular.isDefined(scope.animateStyle)
            ? scope.animateStyle
            : 'shake';
        var duration = angular.isDefined(scope.animateDuration)
            ? parseInt(scope.animateDuration)
            : 1000;

        activate();
        function activate() {

        }

        scope.$watch('animate', function (newValue) {
            if (newValue) {
                launchAnimation();
            }
        });
        function launchAnimation() {
            element.addClass(style + " animated");

            $timeout(function () {
                element.removeClass(style + " animated");
            }, duration);
        }
    }
}
