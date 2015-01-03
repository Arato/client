'use strict';

/**
 * @ngdoc overview
 * @name aratoappApp
 * @description
 * # aratoappApp
 *
 * Main module of the application.
 */
angular
    .module('aratoappApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ui.bootstrap.showErrors',
        'angular-ladda'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/alerts'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller : 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller : 'SignupCtrl'
            })
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller : 'ProfileCtrl'
            })
            .when('/alerts', {
                templateUrl: 'views/alerts.html',
                controller : 'AlertsCtrl'
            })
            .when('/alerts/new', {
                templateUrl: 'views/alert.html',
                controller : 'AlertCtrl'
            })
            .when('/alerts/:alertId', {
                templateUrl: 'views/alert.html',
                controller : 'AlertCtrl'
            })
            .otherwise({
                templateUrl: '404.html'
            });
    });