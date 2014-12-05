'use strict';

angular
    .module('aratoappApp')
    .run(run);

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.authUser = $cookieStore.get('authUser') || {};

    if ($rootScope.authUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.authUser.authData;
    }

    $rootScope.$on("$routeChangeStart", routeChangeStart);

    function routeChangeStart() {
        $rootScope.authUser = $cookieStore.get('authUser') || {};

        if ($location.path() !== '/login' && !$rootScope.authUser.id) {
            $location.path("/login");
        }
    }
}