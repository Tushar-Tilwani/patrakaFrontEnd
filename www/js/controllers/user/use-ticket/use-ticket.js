angular.module('starter.controllers')
  .controller('UseTicketCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, Tickets, $ionicPopup, $cordovaGeolocation, $timeout, $state, $location, getMySocket, _, $ionicHistory, $ionicNavBarDelegate) {

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;

      var posOptions = {timeout: 10000, enableHighAccuracy: true};
      $ionicPlatform.ready(function () {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            $rootScope.myLoc = _.defaults({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }, $rootScope.myLoc);

            $scope.vendorDistance = _.getDistance($scope.ticket.vendor.location, $rootScope.myLoc);

          }, function (err) {
            $scope.err = err;
            // error
          }).finally(function () {
        });
      });

    });


    $scope.backToUseTickets = function () {
      $state.go('user.useTickets');
      //$location.path()
    };

    $scope.ticket = Tickets.getCurrentTicket();
    var mySocket;

    Tickets.get($stateParams.ticketId)
      .then(function (response) {
        $scope.ticket = response.data;
        $scope.vendorDistance = _.getDistance($scope.ticket.vendor.location, $rootScope.myLoc);
      });

    // var posOptions = {timeout: 10000, enableHighAccuracy: true};
    // $ionicPlatform.ready(function () {
    //   $cordovaGeolocation
    //     .getCurrentPosition(posOptions)
    //     .then(function (position) {
    //       $rootScope.myLoc = _.defaults({
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       }, $rootScope.myLoc);
    //
    //       $scope.vendorDistance = _.getDistance($scope.ticket.vendor.location, $rootScope.myLoc);
    //
    //     }, function (err) {
    //       $scope.err = err;
    //       // error
    //     }).finally(function () {
    //   });
    // });

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
            if (data.flag) {
              $ionicHistory.clearHistory();
              $ionicHistory.clearCache();
              $location.path('/useTickets');
            }
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
