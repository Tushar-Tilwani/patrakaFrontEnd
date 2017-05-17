angular.module('starter.services')
  .factory('Vendors', ['$http', 'PROPERTIES', function ($http, PROPERTIES, _) {
    return {
      getByLocation: function (location) {
        return $http.get(PROPERTIES.DOMAIN + 'vendors');
      },
      getById: function (vendorId) {
        return $http.get(PROPERTIES.DOMAIN + 'vendors/' + vendorId);
      },
      getMoviesById: function (vendorId) {
        return $http.get(PROPERTIES.DOMAIN + 'vendors/' + vendorId + '/movies');
      },
      getMoviesWithShowsById: function (vendorId) {
        return $http.get(PROPERTIES.DOMAIN + 'vendors/' + vendorId + '/MoviesWithShows');
      },
      getMoviesByPattern: function (pattern) {
        return $http.get(PROPERTIES.DOMAIN + 'movies/filter/' + pattern);
      },
      putMovieForVendor: function (vendorId, movieId) {
        return $http.put(PROPERTIES.DOMAIN + 'vendors/' + vendorId + '/movie/' + movieId);
      },
      deleteMovieFromVendor: function (vendorId, movieId) {
        return $http.delete(PROPERTIES.DOMAIN + 'vendors/' + vendorId + '/movie/' + movieId);
      },
      createMovieFromVendor: function (vendorId, movieId) {
        return $http.delete(PROPERTIES.DOMAIN + 'vendors/' + vendorId + '/movie/' + movieId);
      },
      getBlacklistedUsers: function (vendorId) {
        return this.getById(vendorId)
          .then(function (response) {
            return _.get(response, 'data.blacklistUsers');
          })
      },
      getVendorsByMovieCorrected: function (movieId, userId) {
        return $http.get(PROPERTIES.DOMAIN + 'movies/' + movieId + '/user/' + userId + '/vendors');
      },
      registerVendor: function (vendorObj) {
        return $http.post(PROPERTIES.SOCKET_DOMAIN + '/registerVendor', vendorObj);
      }
    };
  }]);
