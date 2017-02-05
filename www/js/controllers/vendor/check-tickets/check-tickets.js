angular.module('starter.controllers')
  .controller('CheckTicketCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, Tickets, $cordovaGeolocation) {

    var posOptions = {timeout: 10000, enableHighAccuracy: true};

    $ionicPlatform.ready(function () {
      var _init = function () {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            $scope.myLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }, function (err) {
            $scope.err = err;
            // error
          });
      };
      _init();
    });


  });
