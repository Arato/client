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
        fetchUsers: fetchUsers
    };
    return service;

    function getUsers() {
        return localStorage.getItem('users') ?
               JSON.parse(localStorage.getItem('users')) : [];
    }

    function fetchUsers() {
        $http.get(RouteService.users)
            .success(successCallback)
            .error(errorCallback);

        function successCallback(response) {
            var users = response.data;
            localStorage.setItem('users', JSON.stringify(users));
            return users;
        }

        function errorCallback(error) {
            throw new Error(error);
        }
    }

}
