angular.module('app', ['ngRoute', 'ngResource', 'search.controller', 'search.service', 'search.directive'])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $routeProvider
          .when('/', {
            templateUrl: 'views/search.html',
            controller: 'SearchController'
          })
          .otherwise({
            redirectTo: '/'
          });

        $locationProvider.html5Mode(true);
    }]);
