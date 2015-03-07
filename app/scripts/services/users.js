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

UserService.$inject = ['$http', '$q', 'RouteService'];
function UserService($http, $q, RouteService) {
    var service = {
        index            : index,
        show             : show,
        save             : save,
        delete           : del,
        getAlertsForUser : getAlertsForUser
    };
    return service;

    function index(params) {
        var deferred = $q.defer();

        $http.get(RouteService.users, {params : params})
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

        $http.get(RouteService.users + '/' + id)
            .success(successCallback)
            .error(errorCallback);

        return deferred.promise;

        function successCallback(result) {
            deferred.resolve(result.users);
        }

        function errorCallback(error) {
            deferred.reject(error);
        }
    }

    function save(id, data) {
        var deferred = $q.defer();
        var method = id ? 'PUT' : 'POST';

        var url = RouteService.users;
        if (id) {
            url = url + '/' + id;
        }
        $http({
            method : method,
            url    : url,
            data   : data
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

        $http.delete(RouteService.users + '/' + id)
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

    function getAlertsForUser(userId, params) {
        var deferred = $q.defer();

        var url = RouteService.users + "/" + userId + "/alerts";
        $http.get(url, {params : params})
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
}
