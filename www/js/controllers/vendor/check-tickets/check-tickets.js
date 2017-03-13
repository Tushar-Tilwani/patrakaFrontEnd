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
      $scope.data.distance = _.getDistance($scope.myLoc, $scope.data.location, 'K') * 1000;
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm: ' + data.user.first_name + ' ' + data.user.last_name,
        templateUrl: 'js/controllers/vendor/check-tickets/popup.html',
        scope: $scope
      });

      confirmPopup.then(function (res) {
        if (res) {
          mySocket.emit('validatedTicketResult', _.defaults(data, {flag: true}));
          //mySocket.emit('end', $rootScope.user.vendorId);
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
        return mySocket && mySocket.emit('end', $rootScope.user.vendorId);
      } else if (newValue) {
        mySocket = getMySocket($rootScope.user.vendorId);
        mySocket.on('validateTicket', function (data) {
          showConfirm(data);
        });
      } else {
        mySocket.disconnect();
      }
    });

  });
