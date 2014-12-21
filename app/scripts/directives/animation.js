'use strict';

angular.module('aratoappApp')
    .directive('animation', animation);

animation.$inject = ['$timeout'];
function animation($timeout) {
    var directive = {
        restrict: 'A',
        link    : postLink,
        scope   : {
            animation        : '=',
            animationStyle   : '@?',
            animationDuration: '@?'
        }
    };
    return directive;

    function postLink(scope, element) {
        var style = angular.isDefined(scope.animationStyle)
            ? scope.animationStyle
            : 'shake';
        var duration = angular.isDefined(scope.animationDuration)
            ? parseInt(scope.animationDuration)
            : 1000;

        activate();
        function activate() {

        }

        scope.$watch('animation', function (newValue) {
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
