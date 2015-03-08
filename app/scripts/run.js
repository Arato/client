'use strict';

angular
    .module('aratoApp')
    .run(run);

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    var publicUrls = ['/login', '/signup', '/password'];

    activate();
    $rootScope.$on("$routeChangeStart", routeChangeStart);

    function activate() {
        $rootScope.location = $location;
        // keep user logged in after page refresh
        $rootScope.authUser = $cookieStore.get('authUser') || {};

        if ($rootScope.authUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.authUser.authData;
        }
    }

    function routeChangeStart() {
        $rootScope.authUser = $cookieStore.get('authUser') || {};

        var isPrivateUrl = publicUrls.none(function (url) {
            return url.startsWith($location.path());
        });

        if (isPrivateUrl && !$rootScope.authUser.id) {
            $location.path("/login");
        }
    }
}