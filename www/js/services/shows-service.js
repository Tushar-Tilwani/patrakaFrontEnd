angular.module('starter.services')
  .factory('Shows', ['$http', 'PROPERTIES', function ($http, PROPERTIES) {
    "use strict";
    return {
      postShowForVendor: function (data) {
        return $http.post(PROPERTIES.DOMAIN + 'showrel', data);
      },
      getSortedShows: function (pattern, field, order, pageSize) {
        //http://localhost:3000/shows/filter/*/field/rank/order/asc/pageSize/10

        return $http.get(PROPERTIES.DOMAIN + 'shows/filter/' + pattern + '/field/' + field + '/order/' + order + '/pageSize/' + pageSize);

      },
      getVendorsByShowId: function (showId) {
        ///shows/:showId/vendors
        return $http.get(PROPERTIES.DOMAIN + 'shows/' + showId + '/vendors');
      }
    };
  }]);
