/**
 * Created by subham on 27/3/17.
 */

(function () {

    function companiesListController (recordsAppFactory) {
        var self = this;
        self.companies = null;

        self.deleteCompany = function (companyId) {
            console.log(companyId);
        };

        recordsAppFactory.fetchComapnies().then(
            function (response) {
                self.companies = response.data;
            },
            function (response) {
                console.log(response);
            }
        );
    }

    angular.module('recordsApp').controller('companiesListController', [
        'recordsAppFactory',
        companiesListController
    ]);
}());