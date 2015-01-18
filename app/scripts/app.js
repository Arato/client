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
            .when('/password/remind', {
                templateUrl : 'views/password-remind.html',
                controller  : 'PasswordRemindCtrl'
            })
            .when('/password/reset/:token', {
                templateUrl : 'views/password-reset.html',
                controller  : 'PasswordResetCtrl'
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
            .when('/profile/account', {
                templateUrl : 'views/profile.html',
                controller  : 'ProfileCtrl'
            })
            .when('/profile/my-alerts', {
                templateUrl : 'views/myalerts.html',
                controller  : 'AlertsCtrl',
                resolve     : {
                    alerts : [
                        '$route', '$rootScope', 'AlertService', function ($route, $rootScope, AlertService) {
                            console.log($rootScope.authUser.id);
                            return AlertService.index({
                                page   : $route.current.params.page,
                                userId : $rootScope.authUser.id
                            });
                        }
                    ]
                }
            })
            .otherwise({
                templateUrl : '404.html'
            });
    });