'use strict';

/**
 * @ngdoc service
 * @name aratoappApp.PasswordService
 * @description
 * # PasswordService
 * Service in the aratoappApp.
 */
angular.module('aratoappApp')
    .service('PasswordService', PasswordService);

PasswordService.$inject = ['$q', '$http', 'RouteService',];
function PasswordService($q, $http, RouteService) {
    var service = {
        remind : remind
    };
    return service;

    function remind(email) {
        var deferred = $q.defer();

        $http.post(RouteService.passwordRemind, {
            email : email
        })
            .success(successCallback)
            .error(errorCallback);

        function successCallback(result) {
            deferred.resolve(result);
        }

        function errorCallback(response) {
            deferred.reject(response.error);
        }

        return deferred.promise;
    }
}
