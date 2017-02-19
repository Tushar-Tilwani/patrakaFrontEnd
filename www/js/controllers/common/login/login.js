angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $location, $rootScope) {
    "use strict";

    $scope.loginValues = {
      username: null,
      password: null
    };

    var gotoHomePage = function () {
      $rootScope.user.type === 'vendor' ? $location.path('/vendor/checkTickets') : $location.path('/user/home');
    };

    var setUser = function () {
      if ($rootScope.user) {
        gotoHomePage();
      }
    };

    $scope.$on("$ionicView.enter", function () {
      setUser();
    });

    $scope.login = function () {
      if ($scope.loginValues.username === 'vendor') {
        $rootScope.user = {
          "_id": "5853a2983dc77b661dbf364f",
          "first_name": "Martha",
          "last_name": "Black",
          "email": "mblack1@patch.com",
          "gender": "Female",
          "ip_address": "195.110.142.53",
          "user_name": "mblack1",
          "password": "pass",
          "balance": 148.59,
          "avatar": "https://robohash.org/consequunturnemoin.png?size=200x200&set=set1",
          "phone": "+01-984-858-1836",
          "type": "vendor"
        };
      } else {
        $rootScope.user = {
          "_id": "584de17321add78d386816dc",
          "first_name": "Martha",
          "last_name": "Black",
          "email": "mblack1@patch.com",
          "gender": "Female",
          "ip_address": "195.110.142.53",
          "user_name": "mblack1",
          "password": "pass",
          "balance": 148.59,
          "avatar": "https://robohash.org/consequunturnemoin.png?size=200x200&set=set1",
          "phone": "+01-984-858-1836",
          "type": "user"
        };
      }
      localStorage.setItem('user', JSON.stringify($rootScope.user));
      //$location.path('/tab/home');
      gotoHomePage();
    };
  });
