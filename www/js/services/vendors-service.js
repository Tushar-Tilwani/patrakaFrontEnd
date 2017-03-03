angular.module('starter.services')
  .factory('Vendors', ['$http', 'PROPERTIES', function ($http, PROPERTIES) {
    var VENDORS = [
      {
        "_id": "572bda4df843ec053c061bf5",
        "companyName": "George Eastman Museum",
        "location": {
          "lat": 43.152836,
          "lng": -77.58008
        },
        "rating": 4.4,
        "types": [
          "movie_theater",
          "museum",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "900 East Avenue, Rochester",
        "spots": [{
          "name": "movie 1",
          "movie_id": "1",
          "times": ["10:30", "10:40", "11:40"],
          "ta": [2, 30, 4],
          "end_date": 90809,
          "start_date": 869876
        }, {
          "name": "movie 2",
          "movie_id": "2",
          "times": ["11:30", "10:40", "11:40"],
          "ta": [2, 3, 4],
          "end_date": 90809,
          "start_date": 869876
        }],
        "id": "7a2880832fa7fa92da0b9873083c4a828bfdf8a8",
        "image": "7a2880832fa7fa92da0b9873083c4a828bfdf8a8.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bf6",
        "companyName": "AMC Webster 12",
        "location": {
          "lat": 43.201923,
          "lng": -77.49391
        },
        "rating": 4.4,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "2190 Empire Boulevard, Webster",
        "spots": [{
          "name": "movie 2",
          "movie_id": "7a2880832fa7fa92da0b9873083c4a828bfdf8a8",
          "times": ["10:30", "10:40", "11:40"],
          "ta": [2, 3, 4],
          "end_date": 90809,
          "start_date": 869876
        }],
        "id": "304f86de2ae93324b4069af115d86680d041dc67",
        "image": "304f86de2ae93324b4069af115d86680d041dc67.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bf7",
        "companyName": "Cinemark Movies 10",
        "location": {
          "lat": 43.100555,
          "lng": -77.631065
        },
        "rating": 4.3,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "2609 West Henrietta Road, Rochester",
        "spots": [{
          "name": "movie 1",
          "movie_id": "7a2880832fa7fa92da0b9873083c4a828bfdf8a8",
          "times": ["10:30", "10:40", "11:40"],
          "ta": [2, 3, 4],
          "end_date": 90809,
          "start_date": 869876
        }],
        "id": "cc325d25affc2aaa38fae5499f6b29fb22005e17"
      }
    ];
    var VENDOR_MOVIES;
    return {
      all: function () {
        return VENDORS;
      },
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
      remove: function (vendor) {
        VENDORS.splice(VENDORS.indexOf(vendor), 1);
      },
      get: function (_id) {
        for (var i = 0; i < VENDORS.length; i++) {
          if (VENDORS[i]._id == _id) {
            return VENDORS[i];
          }
        }
        return null;
      }
    };
  }]);
