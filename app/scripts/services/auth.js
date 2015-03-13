'use strict';

/**
 * @ngdoc service
 * @name aratoApp.AuthService
 * @description
 * # AuthService
 * Service in the aratoApp.
 */
angular.module('aratoApp')
    .service('AuthService', AuthService);

AuthService.$inject = ['$q', '$http', 'RouteService', '$rootScope', '$cookieStore', 'Base64'];
function AuthService($q, $http, RouteService, $rootScope, $cookieStore, Base64) {

    var service = {
        login            : login,
        logout           : logout,
        clearCredentials : clearCredentials,
        signup           : signup
    };

    return service;

    function login(email, password) {
        var deferred = $q.defer();

        var credentials = {
            email    : email,
            password : password
        };

        $http.post(RouteService.login, credentials)
            .success(successCallback)
            .error(errorCallback);

        function successCallback(result) {
            setCredentials(credentials, result.data);
            deferred.resolve();
        }

        function errorCallback(response) {
            deferred.reject(response);
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
        var authData = Base64.encodeCredentials(credentials);
        $rootScope.authUser = {
            id              : user.id,
            email           : user.email,
            sequence_number : user.sequence_number,
            authData        : authData
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authData;
        $cookieStore.put('authUser', $rootScope.authUser);
    }

    function clearCredentials() {
        $rootScope.authUser = {};
        $cookieStore.remove('authUser');
        $http.defaults.headers.common.Authorization = 'Basic ';
    }

    function signup(email, password, password_confirmation) {
        var deferred = $q.defer();

        var user = {
            email                 : email,
            password              : password,
            password_confirmation : password_confirmation
        };

        $http.post(RouteService.users, user)
            .success(successCallback)
            .error(errorCallback);

        function successCallback(result) {
            deferred.resolve(result);
        }

        function errorCallback(response) {
            deferred.reject(response);
        }

        return deferred.promise;
    }
}