/**
 * Created by subham on 29/3/17.
 */

(function() {

    function authenticationFactory ($http, $cookies) {

        var login = function (credentials) {
            return $http.post('/api/login/', credentials);
        };

        var logout = function () {
            return $http.post('/api/logout/');
        }

        var getAuthenticatedAccount = function () {
            if (!$cookies.get('authenticatedAccount')) {
                return;
            }
            return $cookies.getObject('authenticatedAccount');
        };

        var isAuthenticated = function () {
            return !!$cookies.get('authenticatedAccount');
        };

        var setAuthenticatedAccount = function (account) {
            $cookies.putObject('authenticatedAccount', account)
        };

        var unauthenticate = function () {
            $cookies.remove('authenticatedAccount');
        };

        return {
            login: login,
            logout: logout,
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };

    }

    angular.module('recordsApp').factory('authenticationFactory', ['$http', '$cookies', authenticationFactory]);
}());
