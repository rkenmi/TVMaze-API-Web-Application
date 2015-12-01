angular.module('show.controller', [])
  .controller('ShowController', function ($scope, ShowService, show) {
    if(show != undefined){
        $scope.show = show[0];
        $scope.showCast = show[1];
    }

    $scope.removeHTML = function (text) {
      return text.replace(/<(?:.|\n)*?>/gm, ''); // a function borrowed from StackOverflow on removing HTML tags from strings
    }

    $scope.displayImg = function (obj) {
      if (obj.character.image){
        return obj.character.image.medium;
      }else if(obj.person.image){
        return obj.person.image.medium;
      }else return "views/img/default_avatar.png";
    }

  });
