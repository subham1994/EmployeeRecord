/**
 * Created by subham on 29/3/17.
 */

(function () {

    function loginController ($location, authenticationFactory) {
        var self = this;

        self.redirectOnAuthentication = function () {
            if (authenticationFactory.isAuthenticated()) {
                $location.path('/');
            }
        };

        self.login = function (credentials) {
            authenticationFactory.login(credentials).then(
                function (response) {
                    console.log(response.data);
                    authenticationFactory.setAuthenticatedAccount(response.data);
                    window.location.href = '/';
                },
                function (response) {
                    console.log(response.data);
                }
            );
        };

        self.redirectOnAuthentication();
    };


    angular.module('recordsApp').controller('loginController', [
        '$location',
        'authenticationFactory',
        loginController
    ]);

}());