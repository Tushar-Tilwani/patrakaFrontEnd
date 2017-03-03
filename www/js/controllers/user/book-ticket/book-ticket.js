angular.module('starter.controllers')
  .controller('BookTicketCtrl', function ($scope, $rootScope, Shows, Tickets, $stateParams, $ionicHistory, $location, ionicDatePicker, $state, moment, _) {
    "use strict";
    $scope.pageData = {
      showTimes: [],
      start_date: null,
      end_date: null,
      ticketsAvailable: null,
      selectedShowTime: null,
      selectedShow: null,
      selectedDate: null
    };

    $scope.ticket = {
      date: null,
      count: null,
      userId: $rootScope.user._id,
      showId: null,
      movieId: $stateParams.movieId,
      vendorId: $stateParams.vendorId
    };


    function setShowTimes(shows) {
      var showTimesInSecs = _.keys(_.groupBy(shows, 'showTime'));

      $scope.pageData.showTimes = _.map(showTimesInSecs, function (t) {
        return {
          text: moment("01-01-1970", "MM-DD-YYYY").add(t, 's').format('LT'),
          value: t
        };
      });

      $scope.pageData.selectedShowTime = _.head($scope.pageData.showTimes).value;
    }

    function setDatePickerObject() {
      $scope.pageData.datePickerObject = {
        callback: function (val) {  //Mandatory
          $scope.pageData.selectedDate = moment(_.toInteger(val)).format('LL');
          $scope.setSelectedShow();
        },
        from: $scope.pageData.start_date,
        to: $scope.pageData.end_date,
        inputDate: $scope.pageData.start_date,      //Optional
        mondayFirst: true,          //Optional
        closeOnSelect: true,       //Optional
        templateType: 'popup'       //Optional
      };
    }

    function updateTicketCountArray(ta) {
      $scope.ticket.count = _.min([2, ta]);
      var maxTicketCount = _.min([10, ta]);
      $scope.pageData.tcArray = _.times(maxTicketCount, function (i) {
        return i + 1;
      });
      $scope.isHouseFull = $scope.ticketsAvailable < 1;
    }


    Shows.getShowsByVendorAndMovie($stateParams.vendorId, $stateParams.movieId)
      .then(function (response) {
        $scope.shows = _.sortBy(response.data, 'date');

        setShowTimes($scope.shows);

        $scope.pageData.selectedShow = _.head($scope.shows);

        var startTime = _.head($scope.shows);
        startTime = (startTime && startTime.date) * 1000;
        $scope.pageData.start_date = moment(startTime).toDate();
        $scope.pageData.selectedDate = moment(startTime).format('LL');

        var endTime = _.last($scope.shows);
        endTime = (endTime && endTime.date) * 1000;
        $scope.pageData.end_date = moment(endTime).toDate();

        setDatePickerObject();
      });


    $scope.openDatePicker = function () {
      ionicDatePicker.openDatePicker($scope.pageData.datePickerObject);
    };

    $scope.$watch('pageData.selectedShowTime', function (newValue) {
      console.log(newValue);
      if (newValue) {
        $scope.setSelectedShow();
      }

    });

    $scope.setSelectedShow = function () {
      var time = $scope.pageData.selectedShowTime;
      var date = $scope.pageData.selectedDate;
      var m = moment(date, "LL").add(time, 's');
      $scope.pageData.selectedShow = _.find($scope.shows, {date: m.unix()});
      updateTicketCountArray($scope.pageData.selectedShow.ticketsAvailable);
    };

    $scope.bookTicket = function () {
      $scope.ticket.showId = $scope.pageData.selectedShow._id;
      //Date to have time at 00:00

      $scope.ticket.date = $scope.pageData.selectedShow.date;
      //console.log($scope.ticket);
      Tickets.book($scope.ticket)
        .then(function (response) {
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $location.path('user/useTickets');
        }, function (error) {
          alert(error.message);
        });
    };
  });
