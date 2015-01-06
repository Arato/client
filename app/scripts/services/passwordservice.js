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
        remind : remind,
        reset  : reset
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


    function reset(email, password, password_confirmation, token) {
        var deferred = $q.defer();

        $http.post(RouteService.passwordReset, {
            email                 : email,
            password              : password,
            password_confirmation : password_confirmation,
            token                 : token
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
