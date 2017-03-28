/**
 * Created by subham on 28/3/17.
 */


(function () {

    function updateEmployeeController (recordsAppFactory, $routeParams) {
        var self = this;
        self.employee = null;

        self.updateEmployee = function (employee) {
            recordsAppFactory.updateEmployee(employee).then(
                function (response) {
                    self.employee = response.data;
                },
                function (response) {
                    console.log(response.status, response.data);
                }
            );
        };

        //noinspection JSUnresolvedVariable
        recordsAppFactory.fetchEmployee($routeParams.employeeId).then(
            function (response) {
                self.employee = response.data;
            },
            function (response) {
                console.log(response.status, response.data);
            }
        );
    }

    angular.module('recordsApp').controller('updateEmployeeController', [
        'recordsAppFactory',
        '$routeParams',
        updateEmployeeController
    ]);
}());