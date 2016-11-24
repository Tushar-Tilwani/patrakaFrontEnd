angular.module('starter.globals')
    .factory('_', ['$window', function ($window) {
        return $window._;
    }])
    .factory('moment', ['$window', function ($window) {
        return $window.moment;
    }]);
