angular.module('starter.controllers')
    .controller('UseTicketsCtrl', function ($scope, $stateParams, Vendors, $cordovaBeacon) {
        $scope.vendor = Vendors.get($stateParams._id);
    });
