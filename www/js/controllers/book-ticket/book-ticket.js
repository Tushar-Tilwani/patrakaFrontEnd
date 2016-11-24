angular.module('starter.controllers')
  .controller('BookTicketCtrl', function ($scope, Vendors, $stateParams, ionicDatePicker, moment, _) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.vendor = Vendors.get($stateParams.vendorId);
    $scope.remove = function (vendor) {
      Vendors.remove(vendor);
    };
    $scope.date = moment().format('LL');

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        //alert(moment(_.toInteger(val)).format('LL'));
        $scope.date = moment(_.toInteger(val)).format('LL');
        //$scope.$apply();
      },
      from: moment().toDate(), //Optional
      to: moment().add(1, 'year').toDate(), //Optional
      inputDate: moment().toDate(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };

  });
