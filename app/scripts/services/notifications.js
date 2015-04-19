'use strict';

/**
 * @ngdoc service
 * @name aratoApp.NotificationService
 * @description
 * # NotificationService
 * Service in the aratoApp.
 */
angular.module('aratoApp')
    .service('NotificationService', NotificationService);

NotificationService.$inject = ['RouteService', 'ApiService'];
function NotificationService(RouteService, ApiService) {
    var service = {
        index                    : index,
        show                     : show,
        save                     : save,
        delete                   : del,
        getNotificationsForAlert : getNotificationsForAlert

    };
    return service;

    function index(params) {
        return ApiService.index(RouteService.notifications, params);
    }

    function show(id) {
        return ApiService.show(RouteService.notifications, id);
    }

    function save(id, data) {
        return ApiService.save(RouteService.notifications, id, data);
    }

    function del(id) {
        return ApiService.delete(RouteService.notifications, id);
    }

    function getNotificationsForAlert(alertId, params) {
        var url = RouteService.alerts + "/" + alertId + "/notifications";
        return ApiService.getRelatedElements(url, params);
    }
}
