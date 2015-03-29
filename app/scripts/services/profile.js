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

ProfileService.$inject = ['UserService'];
function ProfileService(UserService) {
    var service = {
        show : show,
        save : save
    };
    return service;

    function show(id) {
        return UserService.show(id);
    }

    function save(id, data) {
        return UserService.save(id, data);
    }
}
