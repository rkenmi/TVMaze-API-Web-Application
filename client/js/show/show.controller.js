angular.module('search.controller', [])
  .controller('SearchController', function ($scope, SearchService) {
    $scope.shows = [];
    $scope.searchStr;

    $scope.searchShow = function(){
      $scope.searchStr = "Your search for '" + $scope.search + "'";
      var results = SearchService.query( {q: $scope.search}, function () { //.query returns a list of all results in an array
        $scope.shows = results;
      });
    };
  });
