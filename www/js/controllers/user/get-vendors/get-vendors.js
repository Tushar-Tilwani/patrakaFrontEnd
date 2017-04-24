angular.module('starter.controllers')
  .controller('GetVendorsCtrl', function ($scope, _, Movies, $stateParams, $interpolate, $cordovaInAppBrowser) {
    'use strict';

    $scope.movieId = $stateParams.movieId;

    var url = $interpolate('https://www.google.com/maps?saddr=My+Location&daddr={{location.lat}},{{location.lng}}');

    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

    function _init() {
      Movies.getVendorsByMovieId($stateParams.movieId)
        .then(function (response) {
          $scope.vendors = response.data;
        });
    }

    $scope.goToLink = function (vendor) {
      document.addEventListener('deviceready', function () {
        $cordovaInAppBrowser.open(url({location: vendor.location}), '_system', options)
          .then(function (event) {
            // success
          })
          .catch(function (event) {
            // error
          });
        //$cordovaInAppBrowser.close();
      }, false);
    };

    _init();
  });
