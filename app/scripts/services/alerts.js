'use strict';

/**
 * @ngdoc service
 * @name aratoApp.AlertService
 * @description
 * # AlertService
 * Service in the aratoApp.
 */
angular.module('aratoApp')
    .service('AlertService', AlertService);

AlertService.$inject = ['RouteService', 'ApiService'];
function AlertService(RouteService, ApiService) {
    var service = {
        index  : index,
        show   : show,
        save   : save,
        delete : del
    };
    return service;

    function index(params) {
        return ApiService.index(RouteService.alerts, params);
    }

    function show(id) {
        return ApiService.show(RouteService.alerts, id);
    }

    function save(id, data) {
        return ApiService.save(RouteService.alerts, id, data);
    }

    function del(id) {
        return ApiService.delete(RouteService.alerts, id);
    }
}
