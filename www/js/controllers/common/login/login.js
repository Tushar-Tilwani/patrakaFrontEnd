angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $location) {
    "use strict";
    $scope.login = function () {
      $location.path('/tab/home');
    }
  });
