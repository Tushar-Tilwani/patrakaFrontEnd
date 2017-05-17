angular.module('starter.services')
  .factory('Users', ['$http', 'PROPERTIES', function ($http, PROPERTIES) {
    "use strict";
    return {
      login: function (user_name, password) {
        return $http.post(PROPERTIES.DOMAIN + 'login', {
          user_name: user_name,
          password: password
        });
      },
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
      },
      modifyGlobalBlacklistUsers: function (userId, isBlacklisted) {
        return $http.put(PROPERTIES.DOMAIN + 'modifyGlobalBlacklistUsers/' + userId + '/' + isBlacklisted);
      },
      getGloballyBlacklistedUsers: function () {
        return $http.get(PROPERTIES.DOMAIN + 'getGloballyBlacklistedUsers');
      },
      checkUserName: function (userName) {
        return $http.get(PROPERTIES.SOCKET_DOMAIN + '/checkUserName/' + userName);
      },
      registerUser: function (userObj) {
        return $http.post(PROPERTIES.SOCKET_DOMAIN + '/registerUser', userObj);
      },
    };
  }]);
