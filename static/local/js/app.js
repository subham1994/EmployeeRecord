/**
 * Created by subham on 27/3/17.
 */

(function () {

    var recordsApp = angular.module('recordsApp', ['ngRoute', 'ngCookies']);

    recordsApp.config([
        '$routeProvider',
        '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider
                .when('/', {
                    controller: 'companiesListController',
                    controllerAs: 'compList',
                    templateUrl: 'static/assets/views/companiesList.html'
                })
                .when('/login', {
                    controller: 'loginController',
                    controllerAs: 'loginCtrl',
                    templateUrl: 'static/assets/views/login.html'
                })
                .when('/add/company', {
                    controller: 'addCompanyController',
                    controllerAs: 'addcmpCtrl',
                    templateUrl: 'static/assets/views/add-company.html'
                })
                .when('/add/employee/:companyId', {
                    controller: 'addEmployeeController',
                    controllerAs: 'addEmpCtrl',
                    templateUrl: 'static/assets/views/add-employee.html'
                })
                .when('/employees/:companyId', {
                    controller: 'employeesListController',
                    controllerAs: 'empList',
                    templateUrl: 'static/assets/views/employeesList.html'
                })
                .when('/update/:employeeId', {
                    controller: 'updateEmployeeController',
                    controllerAs: 'empCtrl',
                    templateUrl: 'static/assets/views/update-employee.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);

    recordsApp.run(['$http', '$cookies', function ($http, $cookies) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
    }]);

}());