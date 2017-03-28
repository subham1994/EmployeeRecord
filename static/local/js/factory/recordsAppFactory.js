/**
 * Created by subham on 27/3/17.
 */

(function() {

    angular.module('recordsApp').factory('recordsAppFactory', ['$http', function ($http) {

        var addCompany = function (company) {
            console.log(company);
            return $http.post('/api/company/', company);
        };

        var addEmployee = function (employee) {
            return $http.post('/api/employee/', employee);
        };

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

        var fetchComapnies = function (pageNo) {
            return $http.get('/api/companies/', {
                params: { page: pageNo }
            });
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
            addCompany: addCompany,
            addEmployee: addEmployee,
            deleteCompany: deleteCompany,
            deleteEmployee: deleteEmployee,
            fetchComapnies: fetchComapnies,
            fetchEmployee: fetchEmployee,
            fetchEmployeesForCompany: fetchEmployeesForCompany,
            updateEmployee: updateEmployee
        };

    }]);

}());