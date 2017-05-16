angular.module('starter.globals')
  .constant('PROPERTIES', {
    'HOST': 'localhost',
    'PORT': '3000',
    'DOMAIN': 'http://localhost:3000/api/'
  })
  .factory('TokenHttpInterceptor', function ($q, _, $location) {
    return {
      request: function (config) {
        let user = JSON.parse(localStorage.getItem('user'));
        const apiPattern = /\/api\//;

        config.params = config.params || {};

        if (_.get(user, 'token') && apiPattern.test(config.url)) {
          config.params.token = user.token;
        }

        return config || $q.when(config);
      },
      responseError: function (rejection) {
        const message = _.get(rejection, 'data.message');
        if (!_.isEmpty(message)) {
          alert(rejection.data.message);
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  })
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('TokenHttpInterceptor');
  }]);


//http://34.193.93.49/
