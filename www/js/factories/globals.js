angular.module('starter.globals')
  .factory('_', ['$window', function ($window) {
    return $window._;
  }])
  .factory('moment', ['$window', function ($window) {
    return $window.moment;
  }])
  .factory('getMySocket', function (socketFactory) {
    return function (id) {
      var myIoSocket = io.connect('http://localhost:3000/', {query: 'id=' + id});
      return socketFactory({
        ioSocket: myIoSocket
      });
    }
  });
