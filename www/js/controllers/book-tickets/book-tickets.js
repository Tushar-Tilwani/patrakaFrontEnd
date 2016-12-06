angular.module('starter.controllers')
  .controller('BookTicketsCtrl', function ($scope, _, Vendors) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.vendors = Vendors.all();

    // Vendors.getByLocation()
    //     .then(function (response) {
    //         if (response && _.isArray(response.data)) {
    //             $scope.vendors = response.data;
    //         }
    //     });

    $scope.remove = function (vendor) {
      Vendors.remove(vendor);
    };
  });
