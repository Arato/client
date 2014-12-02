'use strict';

/**
 * @ngdoc service
 * @name aratoappApp.AuthService
 * @description
 * # AuthService
 * Service in the aratoappApp.
 */
angular.module('aratoappApp')
    .service('AuthService', AuthService);

AuthService.$inject = ['$q', '$http', 'RouteService', '$rootScope', '$cookieStore', 'Base64'];
function AuthService($q, $http, RouteService, $rootScope, $cookieStore, Base64) {

    var service = {
        login           : login,
        logout          : logout,
        clearCredentials: clearCredentials
    };

    return service;

    function login(email, password) {
        var deferred = $q.defer();

        var credentials = {
            email   : email,
            password: password
        };

        $http.post(RouteService.login, credentials)
            .success(successCallback)
            .error(errorCallback);

        function successCallback(result) {
            setCredentials(credentials, result.data);
            deferred.resolve();
        }

        function errorCallback(error) {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function logout() {
        var deferred = $q.defer();

        $http.post(RouteService.logout)
            .success(successCallback)
            .error(errorCallback);

        function successCallback() {
            clearCredentials();
        }

        function errorCallback(error) {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function setCredentials(credentials, user) {
        var authData = Base64.encode(credentials.email + ':' + credentials.password);

        $rootScope.authUser = {
            id      : user.id,
            email   : user.email,
            authData: authData
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authData;
        $cookieStore.put('authUser', $rootScope.authUser);
    }

    function clearCredentials() {
        $rootScope.authUser = {};
        $cookieStore.remove('authUser');
        $http.defaults.headers.common.Authorization = 'Basic ';
    }
}