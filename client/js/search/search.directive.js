angular.module('search.directive', [])
  .directive('searchDirective', function(){
    return {
      scope: {
        shows : '=shows'
      },
      templateUrl: 'views/search-result.html',
      controller: function ($scope, $element) {
        $scope.removeHTML = function(text) {
          return text.replace(/<(?:.|\n)*?>/gm, ''); // a function borrowed from StackOverflow on removing HTML tags from strings
        };
      }
    };
  });
