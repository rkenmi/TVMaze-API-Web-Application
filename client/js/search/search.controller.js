angular.module('search.controller', [])
  .controller('SearchController', function ($scope, SearchService) {

    $scope.shows = [];
    $scope.searchStr = null;

    $scope.searchShow = function(){
      $scope.searchStr = "Your search for '" + $scope.search + "'";
      var results = SearchService.query( {q: $scope.search}, function () { //.query returns a list of all results in an array
        $scope.shows = results;
      });
    };

    $scope.displayText = function(searchStr, resNum){
      if(searchStr == undefined || resNum == undefined){
        return null;
      }else{
        var str = searchStr + " shows " +resNum + " results.";
        return str;
      }
    }
  });
