/**
 * Created by subham on 28/3/17.
 */

(function () {

    function addCompanyController ($location, recordsAppFactory, authenticationFactory) {

        var self = this;

        if (!authenticationFactory.isAuthenticated()) {
            $location.path('/');
        }

        self.addCompany = function (company) {
            recordsAppFactory.addCompany({
                id: company.id,
                name: company.name,
                createdAt: company.createdAt.getTime() / 1000
            }).then(
                function (response) {
                    console.log(response.data);
                },
                function (response) {
                    console.log(response.status, response.data);
                }
            );
        };

    }

    angular.module('recordsApp').controller('addCompanyController', [
        '$location',
        'recordsAppFactory',
        'authenticationFactory',
        addCompanyController
    ]);
}());