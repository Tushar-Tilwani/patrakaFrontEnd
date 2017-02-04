angular.module('starter.controllers')
  .controller('BookTicketsCtrl', function ($scope, _, Shows) {
    'use strict';

    $scope.populate = function (pattern) {
      pattern = pattern || '*';
      Shows.getSortedShows(pattern, 'rank', 'asc', 10)
        .then(function (response) {
          $scope.shows = response.data;
        });
    };

    $scope.populate('*');
  });
