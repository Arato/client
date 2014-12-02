'use strict';

/**
 * @ngdoc filter
 * @name aratoappApp.filter:toReadableUser
 * @function
 * @description
 * # toReadableUser
 * Filter in the aratoappApp.
 */
angular.module('aratoappApp')
    .filter('toReadableUser', toReadableUser);

toReadableUser.$inject = ['UserService', '$rootScope'];

function toReadableUser(UserService, $rootScope) {
    return function (id) {
        var users = UserService.getUsers();

        var user = users.find(function (u) {
            return u.id === id;
        });

        if (!user) {
            return id;
        }
        return user.id === $rootScope.authUser.id ? "moi" : user.email;
    };
}
