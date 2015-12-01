angular.module('app', ['ngAnimate', 'ngSanitize', 'ngRoute', 'ngResource', 'search.controller', 'search.service', 'search.directive', 'show.controller','show.service', 'search-history.service'])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $routeProvider
          .when('/', {
            templateUrl: 'views/search.html',
            controller: 'SearchController',
            resolve: {
              query : function () { return undefined; }
            }
          })
          .when('/search/:query', {
            templateUrl: 'views/search.html',
            controller: 'SearchController',
            resolve: {
              query : function ($route) {
                console.log($route.current.params.query);
                return $route.current.params.query;
              }
            }
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
          .when('/search-history',{
            templateUrl: 'views/search-history.html',
            controller: function ($scope, SearchHistoryService, history) {
              if(history != undefined){
                  $scope.searchHistory = history;
              }
            },
            resolve: {
              history: function (SearchHistoryService, $q){
                var deferred = $q.defer();
                var promise = deferred.promise;
                SearchHistoryService.query( {}, function (data) {
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
