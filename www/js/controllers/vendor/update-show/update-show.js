angular.module('starter.controllers')
  .controller('UpdateShowCtrl', function ($rootScope, $stateParams, $scope, Movies, Shows, _, moment) {
    "use strict";
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


    $scope.watch('pageData.dates', function (newValue) {
      _.filter(shows,function (o) {
        return moment(_.toNumber(o.date) * 1000);
      })
    });

  });
