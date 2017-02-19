angular.module('starter.controllers')
  .controller('CheckTicketCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, Tickets, $cordovaGeolocation, getMySocket, $ionicPopup, $interpolate, _) {
    var mySocket;

    var posOptions = {timeout: 10000, enableHighAccuracy: true};

    $scope.previousTickets = [];
    $scope.pageData = {};

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

    function emitError(data) {
      mySocket.emit('validatedTicketResult', _.defaults(data, {flag: false, message: 'Please contact Vendor.'}));
    }

    function showConfirm(data) {
      $scope.data = data;
      //Distance in meters
      $scope.data.distance = getDistance($scope.myLoc, $scope.data.location, 'K') * 1000;
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm: ' + data.user.first_name + ' ' + data.user.last_name,
        templateUrl: 'js/controllers/vendor/check-tickets/popup.html',
        scope: $scope
      });

      confirmPopup.then(function (res) {
        if (res) {
          mySocket.emit('validatedTicketResult', _.defaults(data, {flag: true}));
          //mySocket.emit('end', $rootScope.user._id);
          $scope.previousTickets.unshift(data);
        } else {
          emitError(data);
        }
      }, function (err) {
        emitError(data);
      });
      //alert(data.user.first_name);
    }

    $scope.$watch('pageData.shouldScan', function (newValue, oldValue) {
      if (newValue === oldValue) {
        return mySocket && mySocket.emit('end', $rootScope.user._id);
      } else if (newValue) {
        mySocket = getMySocket($rootScope.user._id);
        mySocket.on('validateTicket', function (data) {
          showConfirm(data);
        });
      } else {
        mySocket.disconnect();
      }
    });


    function getDistance(loc1, loc2, unit) {
      var lat1 = loc1.lat;
      var lat2 = loc2.lat;
      var lng1 = loc1.lng;
      var lng2 = loc2.lng;
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lng1 - lng2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344
      }
      if (unit == "N") {
        dist = dist * 0.8684
      }
      return dist
    }


  });
