angular.module('starter.services')
  .factory('Shows', ['$http', 'PROPERTIES', function ($http, PROPERTIES) {
    "use strict";
    return {
      getShowsByVendorAndMovie: function (vendorId, movieId) {
        ///movies/:movieId/vendors
        return $http.get(PROPERTIES.DOMAIN + 'vendors/' + vendorId + '/movies/' + movieId + '/shows');
      }
    };
  }]);
