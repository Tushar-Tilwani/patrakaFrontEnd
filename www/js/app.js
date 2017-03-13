// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter.controllers', []);
angular.module('starter.services', []);
angular.module('starter.globals', []);

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.globals', 'ionic-datepicker', 'ionic-timepicker', 'btford.socket-io'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to movie the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'js/controllers/common/login/login.html',
        controller: 'LoginCtrl'
      })

      // setup an abstract state for the tabs directive
      .state('user', {
        url: '/user',
        abstract: true,
        templateUrl: 'templates/user-tabs.html'
      })

      // Each tab has its own nav history stack:
      .state('user.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'js/controllers/user/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('user.bookTickets', {
        url: '/bookTickets',
        views: {
          'tab-book-tickets': {
            templateUrl: 'js/controllers/user/book-tickets/book-tickets.html',
            controller: 'BookTicketsCtrl'
          }
        }
      })

      .state('user.getVendorsByMovie', {
        url: '/getVendorsByMovie/:movieId',
        views: {
          'tab-book-tickets': {
            templateUrl: 'js/controllers/user/get-vendors/get-vendors.html',
            controller: 'GetVendorsCtrl'
          }
        }
      })

      .state('user.bookTicket', {
        url: '/bookTicket/:movieId/:vendorId',
        views: {
          'tab-book-tickets': {
            templateUrl: 'js/controllers/user/book-ticket/book-ticket.html',
            controller: 'BookTicketCtrl'
          }
        }
      })

      .state('user.useTickets', {
        url: '/useTickets',
        views: {
          'tab-use-tickets': {
            templateUrl: 'js/controllers/user/use-tickets/use-tickets.html',
            controller: 'UseTicketsCtrl'
          }
        }
      })

      .state('user.useTicket', {
        url: '/useTicket/:ticketId',
        views: {
          'tab-use-tickets': {
            templateUrl: 'js/controllers/user/use-ticket/use-ticket.html',
            controller: 'UseTicketCtrl'
          }
        }
      })

      .state('user.aboutUs', {
        url: '/aboutUs',
        views: {
          'tab-about-us': {
            templateUrl: 'js/controllers/common/about-us/about-us.html',
            controller: 'AboutUsCtrl'
          }
        }
      })

      .state('vendor', {
        url: '/vendor',
        abstract: true,
        templateUrl: 'templates/vendor-tabs.html'
      })

      // Each tab has its own nav history stack:
      .state('vendor.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'js/controllers/vendor/home/home.html',
            controller: 'VendorHomeCtrl'
          }
        }
      })

      .state('vendor.makeShows', {
        url: '/makeShows',
        views: {
          'tab-make-shows': {
            templateUrl: 'js/controllers/vendor/make-shows/make-shows.html',
            controller: 'MakeShowsCtrl'
          }
        }
      })

      .state('vendor.makeShow', {
        url: '/makeShows/:movieId',
        views: {
          'tab-make-shows': {
            templateUrl: 'js/controllers/vendor/make-show/make-show.html',
            controller: 'MakeShowCtrl'
          }
        }
      })

      .state('vendor.updateShow', {
        url: '/updateShow/:movieId',
        views: {
          'tab-make-shows': {
            templateUrl: 'js/controllers/vendor/update-show/update-show.html',
            controller: 'UpdateShowCtrl'
          }
        }
      })

      .state('vendor.checkTickets', {
        url: '/checkTickets',
        views: {
          'tab-check-tickets': {
            templateUrl: 'js/controllers/vendor/check-tickets/check-tickets.html',
            controller: 'CheckTicketCtrl'
          }
        }
      })

      .state('vendor.blacklistUsers', {
        url: '/blacklistUsers',
        views: {
          'tab-blacklist-users': {
            templateUrl: 'js/controllers/vendor/blacklist-users/blacklist-users.html',
            controller: 'BlacklistUsersCtrl'
          }
        }
      })

      .state('vendor.aboutUs', {
        url: '/aboutUs',
        views: {
          'tab-about-us': {
            templateUrl: 'js/controllers/common/about-us/about-us.html',
            controller: 'AboutUsCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  })
  .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(),
      to: new Date(2017, 8, 1),
      movieTodayButton: false,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: true,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
  .run(function ($rootScope, $location, $cordovaGeolocation, $ionicPlatform, $ionicHistory, moment, _) {
    $rootScope.moment = moment;
    $rootScope._ = _;
    $rootScope.user = JSON.parse(localStorage.getItem('user'));
    $rootScope.logOut = function () {
      localStorage.setItem('user', null);
      $rootScope.user = null;
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $location.path('/login');
    };

    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $ionicPlatform.ready(function () {
      var _init = function () {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            $rootScope.myLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          }, function (err) {
            $rootScope.err = err;
          })
          .finally(function () {
          });
      };
      _init();
    });

    // $rootScope.vendorId = '5853a2983dc77b661dbf364f';
    // $rootScope.user = {
    //   // //type: 'business',
    //   // type: 'user',
    //   "_id": "584de17321add78d386816dc"
    // }
  });
