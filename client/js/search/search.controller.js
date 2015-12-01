angular.module('search.controller', [])
  .controller('SearchController', function ($scope, SearchService, query) {

    $scope.shows = [];
    $scope.searchStr = null;
    $scope.history = ['hey','sup','yo','why not'];

    $scope.searchShow = function(){
      if($scope.search == undefined)
        return 0;
      $scope.searchStr = "Your search for '" + $scope.search + "'";
      var results = SearchService.query( {q: $scope.search}, function () { //.query returns a list of all results in an array
        $scope.shows = results;
        $scope.search = "";
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

    if(query != undefined){
        $scope.search = query;
        $scope.searchShow();
    }

  });
