angular.module('starter.controllers')
  .controller('AddMovieCtrl', function ($scope, Movies, $stateParams, ionicDatePicker, _, moment) {

    var releaseDateObj = {
      callback: function (val) {  //Mandatory
        $scope.currentMovie.release_date = moment(_.toInteger(val)).format('LL');
      },
      from: moment().toDate(), //Optional
      to: moment().add(1, 'year').toDate(), //Optional
      inputDate: moment().toDate(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.releaseDatePicker = function () {
      ionicDatePicker.openDatePicker(releaseDateObj);
    };

    $scope.currentMovie = {};
    // var f = {
    //   "_id": "584cd68821add78d386802f0",
    //   "fields": {
    //     "directors": ["Ron Howard"],
    //     "release_date": "2013-09-02T00:00:00Z",
    //     "rating": 8.3,
    //     "genres": ["Action", "Biography", "Drama", "Sport"],
    //     "image_url": "http://ia.media-imdb.com/images/M/MV5BMTQyMDE0MTY0OV5BMl5BanBnXkFtZTcwMjI2OTI0OQ@@._V1_SX400_.jpg",
    //     "plot": "A re-creation of the merciless 1970s rivalry between Formula One rivals James Hunt and Niki Lauda.",
    //     "title": "Rush",
    //     "rank": 2,
    //     "running_time_secs": 7380,
    //     "actors": ["Daniel Brühl", "Chris Hemsworth", "Olivia Wilde"],
    //     "year": 2013
    //   },
    //   "id": "tt1979320",
    //   "type": "add"
    // };


    $scope.addMovie = function () {
      var cm = $scope.currentMovie;

      var movie = {};
      _.set(movie, 'fields.directors', _.split(cm.directors, ','));
      _.set(movie, 'fields.genres', _.split(cm.genres, ','));
      _.set(movie, 'fields.actors', _.split(cm.actors, ','));
      _.set(movie, 'fields.running_time_secs', _.toNumber(cm.running_time_mins) * 60);
      _.set(movie, 'fields.plot', cm.plot);
      _.set(movie, 'fields.title', cm.title);
      _.set(movie, 'fields.release_date', moment(cm.release_date, 'LL').format());
      _.set(movie, 'fields.rank', _.toNumber(cm.rank));

      console.log(movie);

    };


  });
