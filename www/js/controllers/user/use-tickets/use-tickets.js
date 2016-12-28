angular.module('starter.controllers')
  .controller('UseTicketsCtrl', function ($scope, $stateParams, Tickets) {
    $scope.tickets = Tickets.all();
  });
