angular.module('starter.controllers')
  .controller('CheckTicketCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, Tickets, $cordovaGeolocation, getMySocket) {
    var mySocket;

    var posOptions = {timeout: 10000, enableHighAccuracy: true};

    $ionicPlatform.ready(function () {
      var _init = function () {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            $scope.myLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          }, function (err) {
            $scope.err = err;
            // error
          });
      };
      _init();
    });

    $scope.$on("$ionicView.enter", function () {
      mySocket = getMySocket($rootScope.vendorId);
      mySocket.on('validate', function (data) {
        $scope.text = data;
        alert(data);
      });
    });


  });
