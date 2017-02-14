angular.module('starter.controllers')
  .controller('UseTicketsCtrl', function ($scope, $rootScope, $stateParams, $location, Tickets) {
    "use strict";

    $scope.$on("$ionicView.enter", function () {
      Tickets.getByUserId($rootScope.user._id)
        .then(function (response) {
          $scope.tickets = response.data;
        });
    });

    $scope.goToTicket = function (ticket) {
      Tickets.setCurrentTicket(ticket);
      $location.path('user/useTicket/' + ticket._id);
    };
  });
