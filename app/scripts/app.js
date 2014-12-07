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
        'ui.bootstrap'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller : 'LoginCtrl'
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
                redirectTo: '/alerts'
            });
    });