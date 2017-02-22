angular.module('starter.controllers')
  .controller('HomeCtrl', function ($scope, $rootScope, Tickets, Movies, _, $ionicSlideBoxDelegate) {

    $scope.data = {};
    $scope.data.bgColors = [];
    $scope.data.currentPage = 0;

    $ionicSlideBoxDelegate.slide(0);

    Tickets.getByUserId($rootScope.user._id)
      .then(function (response) {
        $scope.tickets = _.slice(response.data, 0, 3);
      });

    Movies.getSortedMovies('*', 'rank', 'asc', 3)
      .then(function (response) {
        $scope.movies = _.slice(response.data, 0, 3);
      });
  });

