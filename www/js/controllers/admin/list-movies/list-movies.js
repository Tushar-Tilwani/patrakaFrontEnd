angular.module('starter.controllers')
  .controller('ListMoviesCtrl', function ($scope, DTOptionsBuilder, DTColumnBuilder, Movies, _) {

    $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
      return Movies.getAllMovies()
        .then(function (response) {
          return _.map(response.data, function (movie) {
            return {
              title: movie.fields.title,
              directors: _.join(movie.fields.directors, ', '),
              rating: movie.fields.rating,
              rank: movie.fields.rank,
              actors: _.join(movie.fields.actors, ', ')
            };
          });
        });
    }).withPaginationType('full_numbers');

    $scope.dtColumns = [
      DTColumnBuilder.newColumn('rank').withTitle('Rank'),
      DTColumnBuilder.newColumn('title').withTitle('Title'),
      DTColumnBuilder.newColumn('directors').withTitle('Directors'),
      DTColumnBuilder.newColumn('actors').withTitle('Actors')
    ];

  });

