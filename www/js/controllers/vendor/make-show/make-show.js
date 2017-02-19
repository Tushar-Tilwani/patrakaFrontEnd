angular.module('starter.controllers')
  .controller('MakeShowCtrl', function ($rootScope, $scope, $state, $location, $stateParams, Vendors, Movies, ionicTimePicker, ionicDatePicker, $ionicNavBarDelegate, moment, _) {
    'use strict';
    $scope.times = [];
    $scope.moment = moment;
    $scope.ticketAvailable = 30;
    $scope.price = 10;
    $scope.theaterNumber = 1;
    //$ionicNavBarDelegate.movieBackButton(true);
    $scope.movieToAdd = Vendors.movieToAdd;

    $scope.movie = {
      isNew: true
    };

    var ipObj1 = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          //var time = moment(_.toInteger(val * 1000)).utc().format('hh:mm a');
          $scope.times.push(_.toInteger(val));
        }
      },
      inputTime: 50400,   //Optional
      format: 12,         //Optional
      step: 15,           //Optional
      setLabel: 'Set'    //Optional
    };

    $scope.openTimePicker = function () {
      ionicTimePicker.openTimePicker(ipObj1);
    };


    $scope.startDate = moment().format('LL');
    $scope.endDate = moment().format('LL');

    var startDateObj = {
      callback: function (val) {  //Mandatory
        $scope.startDate = moment(_.toInteger(val)).format('LL');
      },
      from: moment().toDate(), //Optional
      to: moment().add(1, 'year').toDate(), //Optional
      inputDate: moment().toDate(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
    };

    var endDateObj = {
      callback: function (val) {  //Mandatory
        //alert(moment(_.toInteger(val)).format('LL'));
        $scope.endDate = moment(_.toInteger(val)).format('LL');
        //$scope.$apply();
      },
      from: moment().toDate(), //Optional
      to: moment().add(1, 'year').toDate(), //Optional
      inputDate: moment().toDate(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.startDatePicker = function () {
      ionicDatePicker.openDatePicker(startDateObj);
    };

    $scope.endDatePicker = function () {
      ionicDatePicker.openDatePicker(endDateObj);
    };

    $scope.remove = function (i) {
      _.pullAt($scope.times, i);
    };

    $scope.createMovie = function () {
      var noOfDays = moment($scope.endDate, 'LL').diff(moment($scope.startDate, 'LL'), 'days');

      if (_.isEmpty($scope.times)) {
        alert('Should have at minimum of one movie');
        return;
      }
      if (noOfDays < 0) {
        alert('End Date has to be greator than start date');
        return;
      }
      if (!_.isInteger($scope.ticketAvailable) || ($scope.ticketAvailable < 10)) {
        alert('Tickets available should be an integer and more than 10');
        return;
      }

      if (!_.isNumber($scope.price) || $scope.price < 0) {
        alert('Price should be greator than 0');
        return;
      }

      var obj = {
        moviesTimes: $scope.times,
        price: $scope.price,
        startDate: $scope.startDate,
        noOfDays: noOfDays,
        movieId: $stateParams.movieId,
        vendorId: $rootScope.vendorId,
        ticketAvailable: $scope.ticketAvailable
      };

      Movies.postMovieForVendor(obj)
        .then(function (response) {
          console.log(response.data);
          //$ionicNavBarDelegate.movieBackButton(false);
          //$location.path('#/vendor/makeMovies');
        }, function () {
          console.log('Meh');
        });


      /*var obj = {
       moviesTimes: <Array<Integer>> Secs,
       price: <Float>,
       startDate: <Date>,'12-25-1995'
       noOfDays: Integer,
       movieId:<String>,
       vendorId:<String>,
       ticketAvailable:<Integer>
       };*/


    };

  });
