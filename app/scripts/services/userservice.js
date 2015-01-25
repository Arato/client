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
        getUsers  : getUsers,
        fetchUsers: fetchUsers,
        emptyUsers: emptyUsers
    };
    return service;

    function getUsers() {
        return localStorage.getItem('users') ?
               JSON.parse(localStorage.getItem('users')) : [];
    }

    function fetchUsers() {
        var deferred = $q.defer();

        $http.get(RouteService.users)
            .success(successCallback)
            .error(errorCallback);

        return deferred.promise;

        function successCallback(results) {
            var users = results.users;
            localStorage.setItem('users', JSON.stringify(users));
            deferred.resolve(users);
        }

        function errorCallback(error) {
            deferred.reject(error);
        }
    }

    function emptyUsers() {
        localStorage.removeItem('users');
    }
}
