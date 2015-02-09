'use strict';

/**
 * @ngdoc filter
 * @name aratoApp.filter:toReadableUser
 * @function
 * @description
 * # toReadableUser
 * Filter in the aratoApp.
 */
angular.module('aratoApp')
    .filter('toReadableUser', toReadableUser);

toReadableUser.$inject = ['$rootScope'];

function toReadableUser($rootScope) {
    return function (user) {
        if (!user) {
            return null;
        }
        return user.id === $rootScope.authUser.id ? "moi" : user.email;
    };
}
