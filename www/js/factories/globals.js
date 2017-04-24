angular.module('starter.globals')
  .factory('_', ['$window', function ($window) {

    function getDistance(loc1, loc2, unit, roundOff) {
      if (!loc1 || !loc2) {
        return;
      }
      roundOff = roundOff || 2;
      var lat1 = loc1.lat;
      var lat2 = loc2.lat;
      var lng1 = loc1.lng;
      var lng2 = loc2.lng;
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lng1 - lng2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return _.round(dist, roundOff);
    }

    _.mixin({'getDistance': getDistance});
    return $window._;
  }])
  .factory('moment', ['$window', function ($window) {
    return $window.moment;
  }])
  .factory('getMySocket', function (socketFactory, PROPERTIES) {
    return function (id) {
      var myIoSocket = io.connect(PROPERTIES.DOMAIN, {query: 'id=' + id});
      return socketFactory({
        ioSocket: myIoSocket
      });
    }
  });
