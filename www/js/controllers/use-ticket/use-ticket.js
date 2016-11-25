angular.module('starter.controllers')
  .controller('UseTicketCtrl', function ($scope, $stateParams, Tickets, $cordovaBeacon) {
    $scope.ticket = Tickets.get($stateParams.ticketId);
  });
