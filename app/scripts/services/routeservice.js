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
    var baseUrl = "http://arato.local.192.168.1.9.xip.io:8000";

    return {
        login : getUrl("/login"),
        logout: getUrl("/logout"),
        alerts: getUrl("/api/v1/alerts"),
        users : getUrl("/api/v1/users")
    };

    function getUrl(url) {
        return baseUrl + url;
    }
}
