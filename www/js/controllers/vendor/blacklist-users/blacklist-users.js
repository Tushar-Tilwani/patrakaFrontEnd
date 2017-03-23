angular.module('starter.controllers')
  .controller('BlacklistUsersCtrl', function ($rootScope, $scope, _, Users, Vendors) {

    $scope.shouldShowDelete = true;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
    $scope.addUserTypeAhead = {
      results: [],
      searchStr: ''
    };

    function clearTypeAhead() {
      $scope.addUserTypeAhead.results = [];
      $scope.addUserTypeAhead.searchStr = '';

    }

    $scope.items = _.times(10, function (i) {
      return {
        title: "t" + i,
        description: "d" + i
      };
    });


    $scope.searchUsersByPattern = function (str) {
      if (_.isEmpty(str)) {
        $scope.addUserTypeAhead.results = [];
      } else {
        Users.getUsersByNamePattern(str)
          .then(function (response) {
            $scope.addUserTypeAhead.results = response.data;
          }, function () {
          });
      }
    };

    $scope.searchItemClick = function (s) {
      $scope.addUserTypeAhead.searchStr = s.first_name + ' ' + s.last_name;
      $scope.addUserTypeAhead.selectedUser = s;
      $scope.addUserTypeAhead.results = [];
    };

    $scope.add = function () {
      if (_.isEmpty($scope.addUserTypeAhead.selectedUser)) {
        alert('Please Select a user');
        return;
      }
      Users.addBlacklistUser($rootScope.user.vendorId, $scope.addUserTypeAhead.selectedUser._id)
        .then(function (response) {
          if (response.data.n) {
            $scope.blacklistUsers.push($scope.addUserTypeAhead.selectedUser);
            clearTypeAhead();
          } else {
            alert('Error!');
          }
        });
    };

    $scope.remove = function (user) {
      Users.removeBlacklistUser($rootScope.user.vendorId, user._id)
        .then(function (response) {
          if (response.data.n) {
            _.remove($scope.blacklistUsers, {_id: user._id});
          }
        });
    };

    Vendors.getById($rootScope.user.vendorId)
      .then(function (response) {
        Users.getUsersByIds(_.get(response, 'data.blacklist'))
          .then(function (response) {
            $scope.blacklistUsers = response.data || [];
          }, function (error) {

          });
      });


    $scope.$on("$ionicView.enter", function () {

    });

  });
