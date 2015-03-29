'use strict';

/**
 * @ngdoc service
 * @name aratoApp.UserService
 * @description
 * # UserService
 * Service in the aratoApp.
 */
angular.module('aratoApp')
    .service('UserService', UserService);

UserService.$inject = ['RouteService', 'ApiService'];
function UserService(RouteService, ApiService) {
    var service = {
        index            : index,
        show             : show,
        save             : save,
        delete           : del,
        getAlertsForUser : getAlertsForUser
    };
    return service;

    function index(params) {
        return ApiService.index(RouteService.users, params);
    }

    function show(id) {
        return ApiService.show(RouteService.users, id);
    }

    function save(id, data) {
        return ApiService.save(RouteService.users, id, data);
    }

    function del(id) {
        return ApiService.delete(RouteService.users, id);
    }

    function getAlertsForUser(userId, params) {
        var url = RouteService.users + "/" + userId + "/alerts";
        return ApiService.getRelatedElements(url, params);
    }
}
