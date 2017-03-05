angular.module('starter.controllers')
  .controller('UpdateShowCtrl', function ($rootScope, $stateParams, $scope, $ionicPopup, Movies, Shows, _, moment) {
    "use strict";

    $scope.movie = Movies.getCurrentMovie();
    $scope.pageData = {};
    var shows;

    Shows.getShowsByVendorAndMovie($rootScope.user.vendorId, $stateParams.movieId)
      .then(function (response) {
        shows = response.data;
        var showsByDate = _.groupBy(response.data, 'date');

        $scope.pageData.dates = _.uniq(_.map(_.keys(showsByDate), function (d) {
          return moment(_.toNumber(d) * 1000).format('LL');
        }));
      });


    $scope.$watch('pageData.selectedDate', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.pageData.visibleShows = _.filter(shows, function (o) {
          var dateTimeStripped = moment(moment(_.toNumber(o.date) * 1000).format('LL'), 'LL');

          //display shows within that day
          return dateTimeStripped.diff(moment(newValue, 'LL'), 'days') === 0;

        });

        $scope.pageData.visibleShowTimes = _.map($scope.pageData.visibleShows, function (show) {
          return {
            text: moment("01-01-1970", "MM-DD-YYYY").add(show.showTime, 's').format('LT'),
            value: show
          };
        });
      }
    });

    $scope.updateShow = function () {
      Shows.updateShow($scope.pageData.selectedShow)
        .then(function (data) {
          $scope.showAlert('Update Successful');
        }, function () {
          $scope.showAlert('Update Unsuccessful');
        });
    };


    $scope.showAlert = function (txt) {
      var alertPopup = $ionicPopup.alert({
        title: txt,
        template: ''
      });

      alertPopup.then(function (res) {
      });

    };


  });
