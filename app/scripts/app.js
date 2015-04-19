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
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'angular-ladda',
        'config',
        'foundation'
    ])
    .config(app);

app.$inject = ['$stateProvider', '$urlRouterProvider'];
function app($stateProvider, $urlRouterProvider) {

    // fallback route
    $urlRouterProvider.otherwise("/alerts");

    //
    // alerts route
    //
    $stateProvider
        .state('alerts', {
            url         : "/alerts",
            templateUrl : "views/alerts.html",
            controller  : 'AlertsCtrl'
        });

    //
    // login route
    //
    $stateProvider
        .state('login', {
            url         : "/login",
            templateUrl : "views/login.html",
            controller  : 'LoginCtrl'
        });

//    $routeProvider
//        .when('/', {
//            redirectTo : '/alerts'
//        })
//        .when('/login', {
//            templateUrl : 'views/login.html',
//            controller  : 'LoginCtrl'
//        })
//        .when('/signup', {,

//            templateUrl : 'views/signup.html',
//            controller  : 'SignupCtrl'
//        })
//        .when('/password/remind', {
//            templateUrl : 'views/passwordremind.html',
//            controller  : 'PasswordRemindCtrl'
//        })
//        .when('/password/reset/:token', {
//            templateUrl : 'views/passwordreset.html',
//            controller  : 'PasswordResetCtrl'
//        })
//        .when('/alerts', {
//            templateUrl : 'views/alerts.html',
//            controller  : 'AlertsCtrl'
//        })
//        .when('/profile', {
//            templateUrl : 'views/profile.html',
//            controller  : 'ProfileCtrl'
//        })
//        .otherwise({
//            templateUrl : '404.html'
//        });
}
