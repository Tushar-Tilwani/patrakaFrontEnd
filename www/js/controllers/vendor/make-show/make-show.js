angular.module('starter.controllers')
  .controller('MakeShowCtrl', function ($scope, Vendors, ionicTimePicker, ionicDatePicker, moment, _) {
    "use strict";
    $scope.times = ['10:20am'];

    var ipObj1 = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var time = moment(_.toInteger(val * 1000)).utc().format("hh:mm a");
          $scope.times.push(time);
          var selectedTime = new Date(val * 1000);
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');

        }
      },
      inputTime: 50400,   //Optional
      format: 12,         //Optional
      step: 15,           //Optional
      setLabel: 'Set2'    //Optional
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
  });
