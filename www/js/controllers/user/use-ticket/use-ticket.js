angular.module('starter.controllers')
  .controller('UseTicketCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, Tickets, $cordovaGeolocation) {
    $scope.ticket = Tickets.get($stateParams.ticketId);
    $scope.t = '1a';

    $ionicPlatform.ready(function () {
      $scope.hh = function () {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var ticketData = {
              location: {}
            };
            ticketData.location.lat = $scope.lat = position.coords.latitude;
            ticketData.location.lng = $scope.lon = position.coords.longitude;
            $http.post('http://10.0.0.51:3000/location', ticketData)
              .then(function (obj) {
                $scope.lat += 'sss';
                $scope.l = obj.data.distance + ' Meters';
              }, function (err) {
                $scope.l = 'err:' + err;
              });
          }, function (err) {
            $scope.l = err;
            // error
          });
      };
    });
  });
