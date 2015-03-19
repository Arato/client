'use strict';

/**
 * @ngdoc overview
 * @name aratoApp
 * @description
 * # aratoApp
 *
 * Main module of the application.
 */
angular
    .module('aratoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'angular-ladda',
        'config'
    ])
    .config(config);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo : '/alerts'
        })
        .when('/login', {
            templateUrl : 'views/login.html',
            controller  : 'LoginCtrl'
        })
        .when('/signup', {
            templateUrl : 'views/signup.html',
            controller  : 'SignupCtrl'
        })
        .when('/password/remind', {
            templateUrl : 'views/passwordremind.html',
            controller  : 'PasswordRemindCtrl'
        })
        .when('/password/reset/:token', {
            templateUrl : 'views/passwordreset.html',
            controller  : 'PasswordResetCtrl'
        })
        .when('/alerts', {
            templateUrl : 'views/alerts.html',
            controller  : 'AlertsCtrl'
        })
        .when('/profile', {
            templateUrl : 'views/profile.html',
            controller  : 'ProfileCtrl'
        })
        .otherwise({
            templateUrl : '404.html'
        });
}
