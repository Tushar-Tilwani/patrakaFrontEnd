angular.module('starter.controllers')
  .controller('ListMoviesCtrl', function ($scope, $location, $window, DTOptionsBuilder, DTColumnBuilder, Movies, _) {

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = false;
    });

    $scope.dtInstance = {};
    $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
      return Movies.getAllMovies()
        .then(function (response) {
          return _.map(response.data, function (movie) {
            return {
              _id: movie._id,
              title: movie.fields.title,
              directors: _.join(movie.fields.directors, ', '),
              rating: movie.fields.rating,
              rank: movie.fields.rank,
              actors: _.join(movie.fields.actors, ', ')
            };
          });
        });
    })
      .withPaginationType('full_numbers')
      .withOption('fnRowCallback', function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).bind('click', function () {
          $scope.$apply(function () {
            $location.path('/admin/updateMovie/' + aData._id);
          });
        });

        // Do your things
        return nRow;
      });

    $scope.dtColumns = [
      DTColumnBuilder.newColumn('_id').withTitle('_id').notVisible(),
      DTColumnBuilder.newColumn('rank').withTitle('Rank'),
      DTColumnBuilder.newColumn('title').withTitle('Title'),
      DTColumnBuilder.newColumn('directors').withTitle('Directors'),
      DTColumnBuilder.newColumn('actors').withTitle('Actors')
    ];

  });

