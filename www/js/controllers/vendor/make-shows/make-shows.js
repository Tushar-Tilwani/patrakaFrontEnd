angular.module('starter.controllers')
  .controller('MakeShowsCtrl', function ($scope, Vendors) {
    $scope._ = _;
    $scope.addShowTypeAhead = {};

    function _init() {
      Vendors.getShowsById('5853a2983dc77b661dbf364f')
        .then(function (response) {
          $scope.shows = response.data;
        });
    }

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

    $scope.add = function () {
      var showId = _.get($scope.addShowTypeAhead.selected, '_id');
      Vendors.putShowForVendor('5853a2983dc77b661dbf364f', showId)
        .then(function (response) {
          console.log(response);
          _init();
        });
    };

    _init();

  });
