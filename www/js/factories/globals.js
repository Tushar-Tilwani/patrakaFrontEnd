angular.module('starter.globals')
  .factory('_', ['$window', function ($window) {

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
