angular.module('app', ['ngSanitize', 'ngRoute', 'ngResource', 'search.controller', 'search.service', 'search.directive', 'show.controller','show.service'])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $routeProvider
          .when('/', {
            templateUrl: 'views/search.html',
            controller: 'SearchController'
          })
          .when('/show/:id', {
            templateUrl: 'views/show.html',
            controller: 'ShowController',
            resolve: {

              show :  function (ShowService, $route, $q) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                ShowService.query( {id: $route.current.params.id}, function (data) {
                   console.log(data);
                   deferred.resolve(data);
                 });
                return promise;
              }

            }
          })
          .otherwise({
            redirectTo: '/'
          });

        $locationProvider.html5Mode(true);
    }]);
