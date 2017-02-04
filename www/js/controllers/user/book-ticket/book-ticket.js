angular.module('starter.controllers')
  .controller('BookTicketCtrl', function ($scope, Vendors, $stateParams, ionicDatePicker, moment, _) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    var selectedShowIndex = 0;

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

    $scope.ticketsAvailable = 3;
    $scope.ticketCount = _.min([2, $scope.ticketsAvailable]);
    var maxTicketCount = _.min([10, $scope.ticketsAvailable]);
    $scope.tcArray = _.times(maxTicketCount, function (i) {
      return i + 1;
    });
    $scope.isHouseFull = $scope.ticketsAvailable < 1;


    $scope.selected = {
      show: {
        times:['10:20 am','02:20 pm','10:20 pm']
      }
    };

    $scope.updatedShow = function () {
    };

    $scope.getSelectedShowTimings = function () {
      return $scope.selected.show.times;
    }
  });
