/**
 * Created by subham on 27/3/17.
 */

(function() {

    angular.module('recordsApp').factory('recordsAppFactory', ['$http', function ($http) {

        var deleteCompany = function (companyId) {
            return $http.post('/api/company/', { id: companyId }, {
                headers: {
                    'X-HTTP-METHOD-OVERRIDE': 'DELETE'
                }
            });
        };

        var deleteEmployee = function (employeeId) {
            return $http.post('/api/employee/', { id: employeeId }, {
                headers: {
                    'X-HTTP-METHOD-OVERRIDE': 'DELETE'
                }
            });
        };

        var fetchComapnies = function () {
            return $http.get('/api/companies/');
        };

        var fetchEmployeesForCompany = function (companyId) {
            return $http.get('/api/employees/');
        };

        var fetchEmployee = function (employeeId) {
            return $http.get('/api/employee/', {
                params: { id: employeeId }
            });
        };

        var updateEmployee = function (employee) {
            return $http.post('/api/employee/', employee, {
                headers: {
                    'X-HTTP-METHOD-OVERRIDE': 'PUT'
                }
            });
        };

        return {
            deleteCompany: deleteCompany,
            deleteEmployee: deleteEmployee,
            fetchComapnies: fetchComapnies,
            fetchEmployee: fetchEmployee,
            fetchEmployeesForCompany: fetchEmployeesForCompany,
            updateEmployee: updateEmployee
        };

    }]);

}());