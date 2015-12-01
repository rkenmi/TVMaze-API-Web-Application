angular.module('show.service', [])
  .factory('ShowService', function($resource, $q) {
      return $resource('/api/shows/:id/details'); // Note the full endpoint address
  })
