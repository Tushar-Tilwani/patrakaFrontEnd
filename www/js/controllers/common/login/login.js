angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $location, $rootScope, $q, Users, Vendors) {
    "use strict";

    $scope.loginValues = {
      username: null,
      password: null
    };

    var gotoHomePage = function () {
      if ($rootScope.user.type === 'vendor') {
        $location.path('/vendor/checkTickets')
      } else if ($rootScope.user.type === 'admin') {
        $location.path('/admin/listMovies');
      } else {
        $location.path('/user/home');
      }

    };

    var setUser = function () {
      if ($rootScope.user) {
        gotoHomePage();
      }
    };

    $scope.$on("$ionicView.beforeEnter", function () {
      setUser();
    });

    $scope.login = function () {
      return Users.login($scope.loginValues.username, $scope.loginValues.password)
        .then(function (response) {
          $rootScope.user = response.data;
          localStorage.setItem('user', JSON.stringify($rootScope.user));
          gotoHomePage();
        }, function (error) {
          var msg = _.get(error, 'data.message');
          alert(msg || 'No Internet Connectivity');
        });
    };
  });
