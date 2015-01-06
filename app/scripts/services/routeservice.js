'use strict';

/**
 * @ngdoc service
 * @name aratoappApp.RouteService
 * @description
 * # RouteService
 * Service in the aratoappApp.
 */
angular.module('aratoappApp')
    .service('RouteService', RouteService);

RouteService.$inject = [];
function RouteService() {
    //var baseUrl = "http://arato.local.192.168.1.9.xip.io:8000";
    var baseUrl = "http://arato.local:8000";

    return {
        login          : makeUrl("/login"),
        logout         : makeUrl("/logout"),
        alerts         : makeUrl("/api/v1/alerts"),
        users          : makeUrl("/api/v1/users"),
        passwordRemind : makeUrl("/password/remind"),
        passwordReset  : makeUrl("/password/reset")
    };

    function makeUrl(url) {
        return baseUrl + url;
    }
}
