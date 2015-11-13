var app = angular.module('ng-App', ['ngResource']);

var juan = 0;


angular.module('ng-App').factory('Issue', function($resource) {
  return $resource('/api/shows/:q'); // Note the full endpoint address
  //return $resource("http://www.learn-angular.org/ResourceLesson/Users/:id");
});

app.controller('project', function($scope, Issue) {
    //var $scope = this;

    $scope.shows = [];
    $scope.searchStr;

    $scope.msg = function(){
      if (juan == 0){
        juan = 1;
        //var tissue = Issue.get( {id: $scope.id}, function () {
        var tissue = Issue.get( {id: 1}, function () {
          $scope.shows.push(tissue);
        } );
      }
    };

    $scope.searchShow = function(){
      $scope.searchStr = "Your search for '" + $scope.search + "'";

      var results = Issue.query( {q: $scope.search}, function () {
        //$scope.shows.push(result);
        //alert(results);
        $scope.shows = results;
      });

    };


    $scope.removeHTML = function(text) {
      return text.replace(/<(?:.|\n)*?>/gm, ''); // a function borrowed from StackOverflow on removing HTML tags from strings
    };

});
