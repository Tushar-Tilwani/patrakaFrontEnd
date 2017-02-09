angular.module('starter.controllers')
  .controller('MakeShowsCtrl', function ($rootScope, $scope, Vendors, $location) {
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

    $scope.makeShow = function () {
      var showId = _.get($scope.addShowTypeAhead.selected, '_id');
      Vendors.showToAdd = $scope.addShowTypeAhead.selected;
      $location.path('tab/makeShows/' + showId);

      // Vendors.putShowForVendor($rootScope.vendorId, showId)
      //   .then(function (response) {
      //     console.log(response);
      //     _init();
      //   });
    };

    _init();

  });
