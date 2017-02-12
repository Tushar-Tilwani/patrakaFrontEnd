angular.module('starter.controllers')
  .controller('GetVendorsCtrl', function ($scope, _, Movies, $stateParams) {
    'use strict';

    $scope.movieId = $stateParams.movieId;

    function _init() {
      Movies.getVendorsByMovieId($stateParams.movieId)
        .then(function (response) {
          $scope.vendors = response.data;
        });
    }

    _init();
  });
