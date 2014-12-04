'use strict';

/**
 * @ngdoc service
 * @name aratoappApp.UserService
 * @description
 * # UserService
 * Service in the aratoappApp.
 */
angular.module('aratoappApp')
    .service('UserService', UserService);

UserService.$inject = ['$http', 'RouteService'];
function UserService($http, RouteService) {
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

        function successCallback(response) {
            var users = response.data;
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
