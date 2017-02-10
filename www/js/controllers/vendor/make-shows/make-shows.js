angular.module('starter.controllers')
  .controller('MakeShowsCtrl', function ($scope, Vendors) {
    $scope._ = _;
    $scope.addShowTypeAhead = {};
    Vendors.getShowsById('5853a2983dc77b661dbf364f')
      .then(function (response) {
        $scope.shows = response.data;
      });

    $scope.searchShowsByPattern = function (pattern) {
      $scope.addShowTypeAhead.selected = null;
      if (_.isEmpty(pattern)) {
        $scope.addShowTypeAhead.results = [];
        return;
      }
      Vendors.getShowsByPattern(pattern)
        .then(function (response) {
          $scope.addShowTypeAhead.results = response.data;
        });
    };

    $scope.searchItemClick = function (item) {
      $scope.addShowTypeAhead.selected = item;
      $scope.addShowTypeAhead.searchStr = _.get(item, 'fields.title');
      $scope.addShowTypeAhead.results = [];
    };

  });
