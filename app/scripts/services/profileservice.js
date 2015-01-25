'use strict';

/**
 * @ngdoc service
 * @name aratoApp.profile
 * @description
 * # profile
 * Service in the aratoApp.
 */
angular.module('aratoApp')
    .service('ProfileService', ProfileService);

ProfileService.$inject = ['$http', '$q', 'RouteService'];
function ProfileService($http, $q, RouteService) {
    var service = {
        show: show,
        save: save
    };
    return service;

    function show(id) {
        var deferred = $q.defer();

        $http.get(RouteService.users + '/' + id)
            .success(successCallback)
            .error(errorCallback);

        return deferred.promise;

        function successCallback(result) {
            deferred.resolve(result.users);
        }

        function errorCallback(reason, status) {
            deferred.reject({
                reason: reason,
                status: status
            });
        }
    }


    function save(id, data) {
        var deferred = $q.defer();

        $http.put(RouteService.users + '/' + id, data)
            .success(successCallback)
            .error(errorCallback);

        return deferred.promise;

        function successCallback(result) {
            deferred.resolve(result.users);
        }

        function errorCallback(reason, status) {
            deferred.reject({
                reason: reason,
                status: status
            });
        }
    }
}
