angular.module('starter.controllers')
  .controller('BookTicketCtrl', function ($scope, Shows, $stateParams, ionicDatePicker, moment, _) {
    "use strict";
    $scope.pageData = {
      showTimes: [],
      start_date: null,
      end_date: null,
      ticketsAvailable: null,
      selectedShowTime: null,
      selectedShow: null
    };

    $scope.ticket = {
      bookDate: null,
      date: null,
      count: null
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
          $scope.ticket.date = moment(_.toInteger(val)).format('LL');
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


    Shows.getShowsByVendorAndMovie($stateParams.vendorId, $stateParams.movieId)
      .then(function (response) {
        $scope.shows = _.sortBy(response.data, 'date');

        setShowTimes($scope.shows);

        $scope.pageData.selectedShow = _.head($scope.shows);

        var startTime = _.head($scope.shows);
        startTime = (startTime && startTime.date) * 1000;
        $scope.pageData.start_date = moment(startTime).toDate();
        $scope.ticket.date = moment(startTime).format('LL');
        //$scope.ticket.date = $scope.pageData.start_date;


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
      if(newValue){
        $scope.setSelectedShow();
      }

    });

    $scope.setSelectedShow = function () {
      var time = $scope.pageData.selectedShowTime;
      var date = $scope.ticket.date;
      var m = moment(date, "LL").add(time, 's');
      $scope.pageData.selectedShow = _.find($scope.shows, {date: m.unix()});
      updateTicketCountArray($scope.pageData.selectedShow.ticketsAvailable);
    };

    function updateTicketCountArray(ta) {
      $scope.ticket.count = _.min([2, ta]);
      var maxTicketCount = _.min([10, ta]);
      $scope.pageData.tcArray = _.times(maxTicketCount, function (i) {
        return i + 1;
      });
      $scope.isHouseFull = $scope.ticketsAvailable < 1;
    }

    $scope.bookTicket = function () {
      $scope.ticket.bookDate = moment().toDate().toString();
      $scope.ticket.showId = $scope.pageData.selectedShow._id;
      console.log($scope.ticket);
    }
  });
