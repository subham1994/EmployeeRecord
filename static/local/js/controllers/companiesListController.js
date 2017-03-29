/**
 * Created by subham on 27/3/17.
 */

(function () {

    function companiesListController (recordsAppFactory,authenticationFactory) {
        var self = this;
        self.companies = null;
        self.page = {};
        self.is_user_authenticated = authenticationFactory.isAuthenticated();

        self.range = function (n) {
            var numbersInRange = [];
            for (var i = 1; i <= n; i++) numbersInRange.push(i);
            return numbersInRange;
        };

        self.deleteCompany = function (companyId) {
            recordsAppFactory.deleteCompany(companyId).then(
                function (response) {
                    console.log(response.data);
                    // filter the companies list
                    self.companies = self.companies.filter(function (company) {
                        //noinspection JSUnresolvedVariable
                        return company.pk !== companyId;
                    });
                },
                function (response) {
                    console.log(response.status, response.data);
                }
            );
        };

        self.fetchComapnies = function (pageNo) {
            recordsAppFactory.fetchComapnies(pageNo).then(
                function (response) {
                    self.companies = JSON.parse(response.data.companies);
                    self.page.currPage = response.data.currPage;
                    self.page.numPages = response.data.numPages;
                    self.page.hasNextPage = response.data.hasNextPage;
                    self.page.hasPrevPage = response.data.hasPrevPage;
                },
                function (response) {
                    console.log(response.status, response.data);
                }
            );
        };

        self.fetchComapnies(1);

    }

    angular.module('recordsApp').controller('companiesListController', [
        'recordsAppFactory',
        'authenticationFactory',
        companiesListController
    ]);
}());