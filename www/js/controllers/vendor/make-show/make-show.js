angular.module('starter.controllers')
  .controller('MakeShowCtrl', function ($rootScope, $scope, $state, $location, $stateParams, Shows, ionicTimePicker, ionicDatePicker, $ionicNavBarDelegate, moment, _) {
    'use strict';
    $scope.times = [];
    $scope.moment = moment;
    $scope.ticketAvailable = 30;
    $scope.price = 10;
    $ionicNavBarDelegate.showBackButton(true);

    var ipObj1 = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          //var time = moment(_.toInteger(val * 1000)).utc().format('hh:mm a');
          $scope.times.push(_.toInteger(val));
          // var selectedTime = new Date(val * 1000);
          // console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');

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

    $scope.createShow = function () {
      var noOfDays = moment($scope.endDate, 'LL').diff(moment($scope.startDate, 'LL'), 'days');

      if (_.isEmpty($scope.times)) {
        alert('Should have at minimum of one show');
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
        showsTimes: $scope.times,
        price: $scope.price,
        startDate: $scope.startDate,
        noOfDays: noOfDays,
        showId: $stateParams.showId,
        vendorId: $rootScope.vendorId,
        ticketAvailable: $scope.ticketAvailable
      };

      Shows.postShowForVendor(obj)
        .then(function (response) {
          console.log(response.data);
          $ionicNavBarDelegate.showBackButton(false);
          $state.go('tab.makeShows');
          //$location.path('#/tab/makeShows');
        }, function () {
          console.log('Meh');
        });


      /*var obj = {
       showsTimes: <Array<Integer>> Secs,
       price: <Float>,
       startDate: <Date>,'12-25-1995'
       noOfDays: Integer,
       showId:<String>,
       vendorId:<String>,
       ticketAvailable:<Integer>
       };*/


    };

  });
