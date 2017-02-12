angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $location, $rootScope) {
    "use strict";

    $scope.loginValues = {
      username: null,
      password: null
    };

    $scope.login = function () {

      if ($scope.loginValues.username === 'vendor') {
        $rootScope.vendorId = '5853a2983dc77b661dbf364f';
        $rootScope.user = {
          type: 'business'
        }
      } else {
        $rootScope.userId = '5853a2983dc77b661dbf364f';
        $rootScope.user = {
          type: 'personal'
        }
      }
      $location.path('/tab/home');
    }
  });
