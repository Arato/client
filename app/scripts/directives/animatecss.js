'use strict';

angular.module('aratoApp')
    .directive('animatecss', animatecss);

animatecss.$inject = ['$timeout'];
function animatecss($timeout) {
    var directive = {
        restrict : 'A',
        link     : postLink,
        scope    : {
            animatecss         : '=',
            animatecssStyle    : '@?',
            animatecssDuration : '@?'
        }
    };
    return directive;

    function postLink(scope, element) {
        var style = angular.isDefined(scope.animatecssStyle)
            ? scope.animatecssStyle
            : 'shake';
        var duration = angular.isDefined(scope.animatecssDuration)
            ? parseInt(scope.animatecssDuration)
            : 1000;

        activate();
        function activate() {

        }

        scope.$watch('animatecss', function (newValue) {
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
