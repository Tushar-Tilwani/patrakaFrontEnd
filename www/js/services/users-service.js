angular.module('starter.services')
  .factory('Users', ['$http', 'PROPERTIES', function ($http, PROPERTIES) {
    "use strict";
    var currentMovie = null;
    return {
      getUsersByIds: function (ids) {
        return $http.post(PROPERTIES.DOMAIN + 'getUsers', {ids: ids});
      },
      getUsersByNamePattern: function (str) {
        return $http.get(PROPERTIES.DOMAIN + 'users/filter/' + str);
      },
      addBlacklistUser: function (vendorId, userId) {
        //'/vendors/:vendorId/addBlacklist/:userId'
        return $http.put(PROPERTIES.DOMAIN + 'vendors/' + vendorId + '/addBlacklist/' + userId);
      },
      removeBlacklistUser: function (vendorId, userId) {
        return $http.delete(PROPERTIES.DOMAIN + 'vendors/' + vendorId + '/removeBlacklist/' + userId);
      }
    };
  }]);
