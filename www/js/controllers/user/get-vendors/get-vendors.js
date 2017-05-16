angular.module('starter.controllers')
  .controller('GetVendorsCtrl', function ($scope, $rootScope, _, Movies, $stateParams, $interpolate, $cordovaInAppBrowser) {
    'use strict';

    $scope.movieId = $stateParams.movieId;

    console.log($rootScope.myLoc);

    $scope.distanceSort = function (vendor) {
      return _.getDistance(vendor.location, $rootScope.myLoc);
    };


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
      window.open(url({location: vendor.location}), "_blank");
    };

    document.addEventListener('deviceready', function () {
      $scope.goToLink = function (vendor) {
        $cordovaInAppBrowser.open(url({location: vendor.location}), '_system', options)
          .then(function (event) {
            // success
          })
          .catch(function (event) {
            // error
          });
        //$cordovaInAppBrowser.close();
      };
    }, false);

    _init();
  });
