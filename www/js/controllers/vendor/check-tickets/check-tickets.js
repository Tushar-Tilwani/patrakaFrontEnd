angular.module('starter.controllers')
  .controller('CheckTicketCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, Tickets, $cordovaGeolocation, getMySocket, $ionicPopup) {
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


    function showConfirm(mySocket, data) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm: ' + data.user.first_name,
        template: 'Are you <b>sure</b> you want to eat this ice cream?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          mySocket.emit('validated', true);
        } else {
          mySocket.emit('validated', false);
        }
      });
      //alert(data.user.first_name);
    }


    $scope.$on("$ionicView.enter", function () {
      mySocket = getMySocket($rootScope.user._id);
      mySocket.on('validate', function (data) {
        showConfirm(mySocket, data);
      });
    });

  });
