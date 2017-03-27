/**
 * Created by subham on 27/3/17.
 */

(function() {

    angular.module('recordsApp').factory('recordsAppFactory', ['$http', function ($http) {

        var fetchComapnies = function () {
            return $http.get('/api/companies/');
        };

        var fetchEmployeesForCompany = function (companyId) {
            console.log(companyId);
            return $http.get('/api/employees/');
        };

        return {
            fetchComapnies: fetchComapnies,
            fetchEmployeesForCompany: fetchEmployeesForCompany
        };

    }]);

}());