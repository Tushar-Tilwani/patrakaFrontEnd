angular.module('starter.services')
  .factory('Movies', ['$http', 'PROPERTIES', function ($http, PROPERTIES) {
    "use strict";
    var currentMovie = null;
    return {
      postMovieForVendor: function (data) {
        return $http.post(PROPERTIES.DOMAIN + 'shows', data);
      },
      getSortedMovies: function (pattern, field, order, pageSize) {
        //http://localhost:3000/movies/filter/*/field/rank/order/asc/pageSize/10
        return $http.get(PROPERTIES.DOMAIN + 'movies/filter/' + pattern + '/field/' + field + '/order/' + order + '/pageSize/' + pageSize);

      },
      getMovieById: function (movieId) {
        return $http.get(PROPERTIES.DOMAIN + 'movies/' + movieId);
      },
      getVendorsByMovieId: function (movieId) {
        ///movies/:movieId/vendors
        return $http.get(PROPERTIES.DOMAIN + 'movies/' + movieId + '/vendors');
      },
      getCurrentMovie: function () {
        return currentMovie;
      },
      setCurrentMovie: function (movie) {
        currentMovie = movie;
      }
    };
  }]);
