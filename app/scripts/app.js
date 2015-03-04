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
        'ngTouch'
    ])
    .config(config);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/main.html',
            controller  : 'MainCtrl'
        })
        .when('/about', {
            templateUrl : 'views/about.html',
            controller  : 'AboutCtrl'
        })
        .otherwise({
            redirectTo : '/'
        });
}
