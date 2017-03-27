/**
 * Created by subham on 27/3/17.
 */

(function () {

    var recordsApp = angular.module('recordsApp', ['ngRoute'])

    recordsApp.config(function ($routeProvider, $locationProvider) {
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
            .otherwise({
                redirectTo: '/'
            })
    });

}());