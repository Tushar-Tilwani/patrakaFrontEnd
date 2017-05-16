angular.module('starter.controllers')
  .controller('AdminBlacklistUsersCtrl', function ($rootScope, $scope, _, Users, Vendors) {

    $scope.shouldShowDelete = true;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
    $scope.addUserTypeAhead = {
      results: [],
      searchStr: ''
    };

    $scope.blacklistUsers = [];

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
      let selectedUser = $scope.addUserTypeAhead.selectedUser;

      if (_.isEmpty(selectedUser)) {
        alert('Please Select a user');
        return;
      }

      Users.modifyGlobalBlacklistUsers(selectedUser._id, true)
        .then(function () {
          $scope.blacklistUsers.push(selectedUser);
          clearTypeAhead();
        });
    };

    $scope.remove = function (selectedUser) {
      Users.modifyGlobalBlacklistUsers(selectedUser._id, false)
        .then(function () {
          _.remove($scope.blacklistUsers, {_id: selectedUser._id});
          clearTypeAhead();
        });
    };

    Users.getGloballyBlacklistedUsers()
      .then(function (response) {
        $scope.blacklistUsers = response.data || [];
      });

    // Vendors.getById($rootScope.user.vendorId)
    //   .then(function (response) {
    //     Users.getUsersByIds(_.get(response, 'data.blacklist'))
    //       .then(function (response) {
    //         $scope.blacklistUsers = response.data || [];
    //       }, function (error) {
    //
    //       });
    //   });


    $scope.$on("$ionicView.enter", function () {

    });

  });
