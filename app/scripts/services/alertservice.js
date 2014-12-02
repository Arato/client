'use strict';

/**
 * @ngdoc service
 * @name aratoappApp.AlertService
 * @description
 * # AlertService
 * Service in the aratoappApp.
 */
angular.module('aratoappApp')
    .service('AlertService', AlertService);

AlertService.$inject = ['$http', 'RouteService'];
function AlertService($http, RouteService) {
    var service = {
        index: index,
        show : show,
        save : save
    };

    function index(params) {
        return $http.get(RouteService.alerts, {params: params});
    }

    function show(id) {
        return $http.get(RouteService.alerts + '/' + id);
    }

    function save(id, data) {
        var method = id ? 'PUT' : 'POST';

        var url = RouteService.alerts;
        if (id) {
            url = url + '/' + id;
        }
        return $http({
            method: method,
            url   : url,
            data  : data
        })
    }

    return service;
}
