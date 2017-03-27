/**
 * Created by subham on 27/3/17.
 */

(function () {

    function employeesListController (recordsAppFactory, $routeParams) {
        var self = this;
        self.employees = null;

        //noinspection JSUnresolvedVariable
        recordsAppFactory.fetchEmployeesForCompany($routeParams.companyId).then(
            function (response) {
                self.employees = response.data;
            },
            function (response) {
                console.log(response);
            }
        );
    }

    angular.module('recordsApp').controller('employeesListController', [
        'recordsAppFactory',
        '$routeParams',
        employeesListController
    ]);
}());