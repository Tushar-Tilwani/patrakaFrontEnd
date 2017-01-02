angular.module('starter.services')
  .factory('Shows', ['$http', 'PROPERTIES', function ($http, PROPERTIES) {
    return {
      postShowForVendor: function (data) {
        return $http.post(PROPERTIES.DOMAIN + 'showrel', data);
      }
    };
  }]);
