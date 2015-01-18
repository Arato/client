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
            .when('/profile', {
                templateUrl : 'views/profile.html',
                controller  : 'ProfileCtrl'
            })
            .when('/alerts', {
                templateUrl : 'views/alerts.html',
                controller  : 'AlertsCtrl',
                resolve     : {
                    alerts : [
                        '$route', 'AlertService', function ($route, AlertService) {
                            return AlertService.index({
                                page : $route.current.params.page
                            });
                        }
                    ]
                }
            })
            .when('/alerts/new', {
                templateUrl : 'views/alert.html',
                controller  : 'AlertCtrl',
                resolve     : {
                    alert : [
                        function () {
                            return {};
                        }
                    ]
                }
            })
            .when('/alerts/:alertId', {
                templateUrl : 'views/alert.html',
                controller  : 'AlertCtrl',
                resolve     : {
                    alert : [
                        '$route', 'AlertService', function ($route, AlertService) {
                            return AlertService.show($route.current.params.alertId);
                        }
                    ]
                }
            })
            .when('/password/remind', {
                templateUrl : 'views/password-remind.html',
                controller  : 'PasswordRemindCtrl'
            })
            .when('/password/reset/:token', {
                templateUrl : 'views/password-reset.html',
                controller  : 'PasswordResetCtrl'
            })
            .otherwise({
                templateUrl : '404.html'
            });
    });