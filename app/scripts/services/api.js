'use strict';

/**
 * @ngdoc service
 * @name aratoApp.ApiService
 * @description
 * # ApiService
 * Service in the aratoApp.
 */
angular.module('aratoApp')
    .service('ApiService', ApiService);

ApiService.$inject = ['$http', '$q'];
function ApiService($http, $q) {
    var service = {
        index              : index,
        getRelatedElements : getRelatedElements,
        show               : show,
        save               : save,
        delete             : del
    };
    return service;


    function index(url, params) {
        return sendGetRequest(url, params);
    }

    function getRelatedElements(url, params) {
        return sendGetRequest(url, params);
    }

    function show(url, id) {
        var fullUrl = url + '/' + id;
        return sendGetRequest(fullUrl, {});
    }

    function save(url, id, data) {
        var deferred = $q.defer();
        var method = id ? 'PUT' : 'POST';

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

    function del(url, id) {
        var deferred = $q.defer();

        $http.delete(url + '/' + id)
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

    function sendGetRequest(url, params) {
        var deferred = $q.defer();

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
