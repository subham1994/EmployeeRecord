/**
 * Created by subham on 29/3/17.
 */

(function () {

    function navbarController ($location, authenticationFactory) {
        var self = this;
        self.name = null;

        if (authenticationFactory.isAuthenticated()) {
            var user = authenticationFactory.getAuthenticatedAccount();
            self.name = user.firstName + ' ' + user.lastName;
        }
        
        self.logout = function () {
            authenticationFactory.logout().then(
                function (response) {
                    console.log(response.data);
                    authenticationFactory.unauthenticate();
                    window.location.href = '/';
                    self.name = null;
                },
                function (response) {
                    console.log(response.data);
                }
            );
        };
    };


    angular.module('recordsApp').controller('navbarController', [
        '$location',
        'authenticationFactory',
        navbarController
    ]);

}());
