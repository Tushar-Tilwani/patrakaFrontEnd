angular.module('starter.controllers')
  .controller('MakeShowsCtrl', function ($rootScope, $scope, Vendors, $location) {
    $scope._ = _;
    $scope.addMovieTypeAhead = {};

    function _init() {
      Vendors.getMoviesById($rootScope.user.vendorId)
        .then(function (response) {
          $scope.movies = response.data;
        });
    }

    $scope.searchMoviesByPattern = function (pattern) {
      $scope.addMovieTypeAhead.selected = null;
      if (_.isEmpty(pattern)) {
        $scope.addMovieTypeAhead.results = [];
        return;
      }
      Vendors.getMoviesByPattern(pattern)
        .then(function (response) {
          $scope.addMovieTypeAhead.results = response.data;
        });
    };

    $scope.searchItemClick = function (item) {
      $scope.addMovieTypeAhead.selected = item;
      $scope.addMovieTypeAhead.searchStr = _.get(item, 'fields.title');
      $scope.addMovieTypeAhead.results = [];
      $scope.makeShow();
    };

    $scope.makeShow = function () {
      var movieId = _.get($scope.addMovieTypeAhead.selected, '_id');
      Vendors.movieToAdd = $scope.addMovieTypeAhead.selected;
      $location.path('vendor/makeShows/' + movieId);
    };

    $scope.clear = function () {
      $scope.addMovieTypeAhead.selected = null;
      $scope.addMovieTypeAhead.searchStr = '';
      $scope.addMovieTypeAhead.results = [];
    };

    $scope.$on("$ionicView.enter", function () {
      _init();
    });

  });
