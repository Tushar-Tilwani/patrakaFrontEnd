angular.module('starter.controllers')
  .factory('mySocket', function (socketFactory) {
    var myIoSocket = io.connect('http://localhost:3000/', {query: 'id=bar'});

    return socketFactory({
      ioSocket: myIoSocket
    });
  })
  .controller('AboutUsCtrl', function ($scope, mySocket) {

    $scope.settings = {
      enableFriends: true
    };

    mySocket.on('connId', function (data) {
      $scope.text = data;
    });

    mySocket.on('pass', function (data) {
      $scope.text = data;
    });

    $scope.send = function () {
      mySocket.emit('msg', 'yaya');
    };

  });
