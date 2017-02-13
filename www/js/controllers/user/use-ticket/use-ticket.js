angular.module('starter.controllers')
  .controller('UseTicketCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, Tickets, $ionicPopup, $cordovaGeolocation, $timeout, $state, $location) {
    $scope.ticket = Tickets.getCurrentTicket();

    if (!$scope.ticket) {
      Tickets.get($stateParams.ticketId).then(function (response) {
        $scope.ticket = response.data;
      });
    }


    var sucessPopupData = {
      title: '<i class="icon ion-checkmark-circled green"></i> Authentication Successful',
      template: ''
    };

    var failedPopupData = {
      title: '<i class="icon ion-checkmark-circled yellow"></i> Authentication Failed',
      template: ''
    };

    $scope.useTicket = function () {
      $scope.isLoading = true;

      Tickets.useTicket($scope.ticket._id)
        .then(function (response) {
          $ionicPopup.alert(sucessPopupData)
            .then(function () {
              scope.isLoading = false;
              $location.path('tab/useTickets');
            });

        }, function (error) {
          failedPopupData.title += ' ' + error.message;
          $ionicPopup.alert(failedPopupData)
            .then(function () {
              scope.isLoading = false;
            });

        });

      // $timeout(function () {
      //   $scope.isLoading = false;
      //   $ionicPopup.alert(popupData)
      //     .then(function (res) {
      //       $location.path('tab/useTickets');
      //     });
      // }, 1000);
    };

  });
