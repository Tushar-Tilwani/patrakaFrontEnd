angular.module('starter.controllers')
  .controller('UseTicketCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, Tickets, $ionicPopup, $cordovaGeolocation, $timeout, $state, $location, getMySocket, _, $ionicHistory, $ionicNavBarDelegate) {

     $ionicHistory.backView();
     $ionicNavBarDelegate.showBackButton(true);

    $scope.backToUseTickets = function () {
      $state.go('user.useTickets');
      //$location.path()
    };

    $scope.ticket = Tickets.getCurrentTicket();
    var mySocket;

    if (!$scope.ticket) {
      Tickets.get($stateParams.ticketId).then(function (response) {
        $scope.ticket = response.data;
      });
    }

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

    function getPopUpData(data) {
      return {
        title: data.flag ? '<i class="icon ion-checkmark-circled green"></i> Authentication Successful' : '<i class="icon ion-minus-circled yellow"></i> Authentication Failed <br/>' + _.toString(data.message),
        template: ''
      };
    }


    $scope.$on("$ionicView.enter", function () {
      mySocket = getMySocket($rootScope.user._id);

      mySocket.on('validatedTicketResult', function (data) {
        $ionicPopup.alert(getPopUpData(data))
          .then(function () {
            $scope.isLoading = false;
          });
      });

      $scope.useTicket = function () {
        $scope.isLoading = true;
        var myLoc = {
          lat: $scope.myLoc.lat || $rootScope.myLoc.lat,
          lng: $scope.myLoc.lng || $rootScope.myLoc.lng
        };
        mySocket.emit('validateTicket', {ticketId: $scope.ticket._id, location: myLoc});
      };

    });
  });
