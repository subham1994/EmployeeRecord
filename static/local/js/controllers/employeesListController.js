/**
 * Created by subham on 27/3/17.
 */

(function () {

    function employeesListController (recordsAppFactory, $routeParams) {
        var self = this;
        self.employees = null;

        self.deleteEmployee = function (employeeId) {
            recordsAppFactory.deleteEmployee(employeeId).then(
                function (response) {
                    console.log(response.data);
                    // filter the employees list
                    self.employees = self.employees.filter(function (employee) {
                        //noinspection JSUnresolvedVariable
                        return employee.pk !== employeeId
                    });
                },
                function (response) {
                    console.log(response.status, response.data);
                }
            );
        };

        //noinspection JSUnresolvedVariable
        recordsAppFactory.fetchEmployeesForCompany($routeParams.companyId).then(
            function (response) {
                self.employees = response.data;
            },
            function (response) {
                console.log(response.status, response.data);
            }
        );
    }

    angular.module('recordsApp').controller('employeesListController', [
        'recordsAppFactory',
        '$routeParams',
        employeesListController
    ]);
}());