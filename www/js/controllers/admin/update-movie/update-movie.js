angular.module('starter.controllers')
  .controller('UpdateMovieCtrl', function ($scope, Movies, $location, $timeout, $window, $stateParams, ionicDatePicker, _, moment, $ionicPopup) {

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

    function goToListMovies() {
      $location.path('admin/listMovies');

      $timeout(function () {
        $window.location.reload();
      }, 200);
    }

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


    var movie;
    Movies.getMovieById($stateParams.movieId)
      .then(function (response) {
        movie = response.data;
        $scope.currentMovie = {
          directors: _.get(movie, 'fields.directors'),
          genres: _.get(movie, 'fields.genres'),
          image_url: _.get(movie, 'fields.image_url'),
          running_time_mins: (_.get(movie, 'fields.running_time_secs') / 60) || 120,
          actors: _.get(movie, 'fields.actors'),
          release_date: moment(_.get(movie, 'fields.release_date')).format('LL'),
          plot: _.get(movie, 'fields.plot'),
          title: _.get(movie, 'fields.title')
        };
      });

    $scope.updateMovie = function () {
      var cm = $scope.currentMovie;

      _.set(movie, 'fields.directors', _.split(cm.directors, ','));
      _.set(movie, 'fields.genres', _.split(cm.genres, ','));
      _.set(movie, 'fields.actors', _.split(cm.actors, ','));
      _.set(movie, 'fields.running_time_secs', cm.running_time_mins * 60);
      _.set(movie, 'fields.plot', cm.plot);
      _.set(movie, 'fields.title', cm.title);
      _.set(movie, 'fields.release_date', moment(cm.release_date, 'LL').format());

      console.log(movie);

      Movies.updateMovie(movie._id, movie)
        .then(function (response) {
          goToListMovies();
        });
    };


    $scope.deleteMovie = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Movie!',
        template: 'Are you sure?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          Movies.deleteMovie(movie._id)
            .then(function (response) {
              $ionicPopup.alert({
                title: 'Deleted!',
                template: ''
              }).then(function () {
                goToListMovies();
              });
            }, function (error) {
              //console.log(error.data.message);
              $ionicPopup.alert({
                title: 'Error!',
                template: error.data.message
              });
            });
        } else {
          console.log('Not sure!');
        }
      });


    };

  })
  .directive('fdInput', function () {
    return {
      scope: {
        fileName: '='
      },
      link: function (scope, element, attrs) {
        element.on('change', function (evt) {
          var files = evt.target.files;
          console.log(files[0].name);
          console.log(files[0].size);

          scope.fileName = files[0].name;

          var reader = new FileReader();

          reader.onload = function (e) {
            // scope.fileSrc = e.target.result;
            // scope.$apply();
            $('#fileImg').attr('src', e.target.result);
            //scope.currentMovie.image_url = e.target.result;
          };

          reader.readAsDataURL(files[0]);

        });
      }
    }
  });

