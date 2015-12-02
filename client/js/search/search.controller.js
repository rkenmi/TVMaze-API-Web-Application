angular.module('search.controller', [])
  .controller('SearchController', function ($scope, SearchService, SearchHistoryService, query, history) {

    $scope.shows = [];
    $scope.searchStr = null;
    $scope.historyVisible = false;
    $scope.expandSign = '+';

    $scope.searchShow = function(){
      if($scope.search == undefined)
        return 0;
      $scope.searchStr = "Your search for '" + $scope.search + "'";
      var results = SearchService.query( {q: $scope.search}, function () { //.query returns a list of all results in an array
        $scope.shows = results;
        $scope.search = "";
        SearchHistoryService.query( {}, function (data) {
          $scope.searchHistory = data;
        });
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

    $scope.clickHistory = function(){
      $scope.historyVisible = !($scope.historyVisible);
      if($scope.expandSign == '-'){
        $scope.expandSign = '+';
      } else {
        $scope.expandSign = '-';
      }
    }

    if(query != undefined){
        $scope.search = query;
        $scope.searchShow();
    }

    if(history != undefined){
        $scope.searchHistory = history;
    }

  });
