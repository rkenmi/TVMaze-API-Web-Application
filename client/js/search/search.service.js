angular.module('search.service', [])
  .factory('SearchService', function($resource) {
    return $resource('/api/shows/:q'); // Note the full endpoint address
  });
