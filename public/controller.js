var app = angular.module('ng-App', ['ngResource']);

angular.module('ng-App').factory('Issue', function($resource) {
  return $resource('/api/shows/:q'); // Note the full endpoint address
});

app.controller('project', function($scope, Issue) {
    $scope.shows = [];
    $scope.searchStr;

    $scope.searchShow = function(){
      $scope.searchStr = "Your search for '" + $scope.search + "'";
      var results = Issue.query( {q: $scope.search}, function () { //.query returns a list of all results in an array
        $scope.shows = results;
      });
    };
});

app.directive('searchResults', function(){
  return {
    scope: {
      shows : '=shows'
    },
    templateUrl: 'searchResult.html',
    link: function (scope, element) {
      scope.removeHTML = function(text) {
        return text.replace(/<(?:.|\n)*?>/gm, ''); // a function borrowed from StackOverflow on removing HTML tags from strings
      };
    }
  };
});
