angular.module('starter.controllers')
  .controller('GetVendorsCtrl', function ($scope, _, Shows, $stateParams) {
    'use strict';

    $scope.showId = $stateParams.showId;

    function _init() {
      Shows.getVendorsByShowId($stateParams.showId)
        .then(function (response) {
          $scope.vendors = response.data;
        });
    }

    _init();
  });
