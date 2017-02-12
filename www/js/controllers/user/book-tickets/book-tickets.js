angular.module('starter.controllers')
  .controller('BookTicketsCtrl', function ($scope, _, Movies) {
    'use strict';

    $scope.populate = function (pattern) {
      pattern = pattern || '*';
      Movies.getSortedMovies(pattern, 'rank', 'asc', 10)
        .then(function (response) {
          $scope.movies = response.data;
        });
    };

    $scope.populate('*');
  });
