angular.module('starter.services')
  .factory('Shows', ['$http', 'PROPERTIES', function ($http, PROPERTIES) {
    "use strict";
    return {
      getShowsByVendorAndMovie: function (vendorId, movieId) {
        ///movies/:movieId/vendors
        return $http.get(PROPERTIES.DOMAIN + 'vendors/' + vendorId + '/movies/' + movieId + '/shows');
      },
      generateShows: function (resData) {
        return $http.post(PROPERTIES.DOMAIN + 'shows', resData);
      },
      updateShow: function (show) {
        return $http.put(PROPERTIES.DOMAIN + 'shows/' + show._id, show);
      }
    };
  }]);
