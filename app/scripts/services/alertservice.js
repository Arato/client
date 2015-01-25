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

AlertService.$inject = ['$http', '$q', 'RouteService'];
function AlertService($http, $q, RouteService) {
    var service = {
        index : index,
        show  : show,
        save  : save,
        delete: del
    };
    return service;

    function index(params) {
        var deferred = $q.defer();

        $http.get(RouteService.alerts, {params: params})
            .success(successCallback)
            .error(errorCallback);

        return deferred.promise;

        function successCallback(results) {
            deferred.resolve(results);
        }

        function errorCallback(error) {
            deferred.reject(error);
        }
    }

    function show(id) {
        var deferred = $q.defer();

        $http.get(RouteService.alerts + '/' + id)
            .success(successCallback)
            .error(errorCallback);

        return deferred.promise;

        function successCallback(result) {
            deferred.resolve(result.alerts);
        }

        function errorCallback(error) {
            deferred.reject(error);
        }
    }

    function save(id, data) {
        var deferred = $q.defer();
        var method = id ? 'PUT' : 'POST';

        var url = RouteService.alerts;
        if (id) {
            url = url + '/' + id;
        }
        $http({
            method: method,
            url   : url,
            data  : data
        })
            .success(successCallback)
            .error(errorCallback);

        return deferred.promise;

        function successCallback(result) {
            deferred.resolve(result);
        }

        function errorCallback(error) {
            deferred.reject(error);
        }
    }

    function del(id) {
        var deferred = $q.defer();

        $http.delete(RouteService.alerts + '/' + id)
            .success(successCallback)
            .error(errorCallback);

        return deferred.promise;

        function successCallback(result) {
            deferred.resolve(result);
        }

        function errorCallback(error) {
            deferred.reject(error);
        }
    }
}
