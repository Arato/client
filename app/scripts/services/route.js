'use strict';

/**
 * @ngdoc service
 * @name aratoApp.RouteService
 * @description
 * # RouteService
 * Service in the aratoApp.
 */
angular.module('aratoApp')
    .service('RouteService', RouteService);

RouteService.$inject = ['ENV'];
function RouteService(ENV) {
    return {
        login          : makeUrl("/login"),
        logout         : makeUrl("/logout"),
        alerts         : makeUrl("/api/v1/alerts"),
        users          : makeUrl("/api/v1/users"),
        passwordRemind : makeUrl("/password/remind"),
        passwordReset  : makeUrl("/password/reset")
    };

    function makeUrl(url) {
        return ENV.apiEndpoint + url;
    }
}
