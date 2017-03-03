angular.module('starter.controllers')
  .controller('MakeShowsCtrl', function ($rootScope, $scope, Vendors, $location, _, moment) {
    $scope._ = _;
    $scope.addMovieTypeAhead = {};

    function _init() {
      Vendors.getMoviesWithShowsById($rootScope.user.vendorId)
        .then(function (response) {
          $scope.moviesWithShows = _.map(response.data, function (s) {
            s.showTimes = _.map(s.showTimes, function (t) {
              return moment("01-01-1970", "MM-DD-YYYY").add(_.toInteger(t), 's').format('LT');
            });
            s.end_date = moment(_.toInteger(s.end_date) * 1000).format('LL');
            return s;
          });
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

    $scope.updateShow = function (movieId) {
      $location.path('vendor/updateShow/' + movieId);
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
