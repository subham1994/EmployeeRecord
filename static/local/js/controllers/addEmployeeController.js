/**
 * Created by subham on 28/3/17.
 */

(function () {

    function addEmployeeController (recordsAppFactory, $routeParams) {

        var self = this;

        self.addEmployee = function (employee) {
            recordsAppFactory.addEmployee({
                employeeId: employee.employeeId,
                firstName: employee.firstName,
                lastName: employee.lastName,
                designation: employee.designation,
                companyId: $routeParams.companyId,
                joiningDate: employee.joiningDate.getTime() / 1000
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

    angular.module('recordsApp').controller('addEmployeeController', [
        'recordsAppFactory',
        '$routeParams',
        addEmployeeController
    ]);
}());