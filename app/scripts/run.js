'use strict';

angular
    .module('aratoappApp')
    .run(run);

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    var publicUrls = ['/login', '/signup'];

    activate();
    $rootScope.$on("$routeChangeStart", routeChangeStart);

    function activate() {
        // keep user logged in after page refresh
        $rootScope.authUser = $cookieStore.get('authUser') || {};

        if ($rootScope.authUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.authUser.authData;
        }
    }

    function routeChangeStart() {
        $rootScope.authUser = $cookieStore.get('authUser') || {};

        if (publicUrls.none($location.path()) && !$rootScope.authUser.id) {
            $location.path("/login");
        }
    }
}