angular.module('starter.controllers')
  .controller('UseTicketCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, Tickets, $ionicPopup, $cordovaGeolocation, $timeout, $state, $location) {
    $scope.ticket = Tickets.get($stateParams.ticketId);
    // $scope.ticket = {
    //   companyName: ''
    // }

    var popupData = {
      title: '<i class="icon ion-checkmark-circled green"></i> Authentication Successful',
      template: ''
    };

    $scope.useTicket = function () {
      //$state.go('tab.useTicket');

      $scope.isLoading = true;
      $timeout(function () {
        $scope.isLoading = false;
        $ionicPopup.alert(popupData)
          .then(function (res) {
            $location.path('tab/useTickets');
          });
      }, 1000);

    };

  });
