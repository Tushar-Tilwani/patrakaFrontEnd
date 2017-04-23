angular.module('starter.controllers')
  .controller('UseTicketsCtrl', function ($scope, $rootScope, $stateParams, $location, Tickets, _) {
    'use strict';

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = false;
    });

    $scope.$on('$ionicView.enter', function () {
      Tickets.getByUserId($rootScope.user._id)
        .then(function (response) {
          $scope.tickets = response.data;

          $scope.activeTickets = _.filter(response.data, function (o) {
            return o.status != 'inactive';
          });

          $scope.inactiveTickets = _.filter(response.data, {'status': 'inactive'});

        });
    });

    $scope.goToTicket = function (ticket) {
      Tickets.setCurrentTicket(ticket);
      $location.path('user/useTicket/' + ticket._id);
    };
  });
