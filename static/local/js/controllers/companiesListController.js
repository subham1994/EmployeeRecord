/**
 * Created by subham on 27/3/17.
 */

(function () {

    function companiesListController (recordsAppFactory) {
        var self = this;
        self.companies = null;

        self.deleteCompany = function (companyId) {
            recordsAppFactory.deleteCompany(companyId).then(
                function (response) {
                    console.log(response.data);
                    // filter the companies list
                    self.companies = self.companies.filter(function (company) {
                        //noinspection JSUnresolvedVariable
                        return company.pk !== companyId
                    });
                },
                function (response) {
                    console.log(response.status, response.data);
                }
            );
        };

        recordsAppFactory.fetchComapnies().then(
            function (response) {
                self.companies = response.data;
            },
            function (response) {
                console.log(response.status, response.data);
            }
        );
    }

    angular.module('recordsApp').controller('companiesListController', [
        'recordsAppFactory',
        companiesListController
    ]);
}());