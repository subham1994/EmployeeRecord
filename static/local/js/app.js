/**
 * Created by subham on 27/3/17.
 */

(function () {

    var recordsApp = angular.module('recordsApp', ['ngRoute'])

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

}());