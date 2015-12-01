angular.module('search-history.service', [])
  .factory('SearchHistoryService', function($resource) {
      return $resource('/api/searchHistory'); // Note the full endpoint address
  })
