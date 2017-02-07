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
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
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
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'js/controllers/user/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('tab.bookTickets', {
        url: '/bookTickets',
        views: {
          'tab-book-tickets': {
            templateUrl: 'js/controllers/user/book-tickets/book-tickets.html',
            controller: 'BookTicketsCtrl'
          }
        }
      })

      .state('tab.getVendorsByShow', {
        url: '/getVendorsByShow/:showId',
        views: {
          'tab-book-tickets': {
            templateUrl: 'js/controllers/user/get-vendors/get-vendors.html',
            controller: 'GetVendorsCtrl'
          }
        }
      })

      .state('tab.bookTicket', {
        url: '/bookTicket/:showId/:vendorId',
        views: {
          'tab-book-tickets': {
            templateUrl: 'js/controllers/user/book-ticket/book-ticket.html',
            controller: 'BookTicketCtrl'
          }
        }
      })

      .state('tab.useTickets', {
        url: '/useTickets',
        views: {
          'tab-use-tickets': {
            templateUrl: 'js/controllers/user/use-tickets/use-tickets.html',
            controller: 'UseTicketsCtrl'
          }
        }
      })

      .state('tab.useTicket', {
        url: '/useTicket/:ticketId',
        views: {
          'tab-use-tickets': {
            templateUrl: 'js/controllers/user/use-ticket/use-ticket.html',
            controller: 'UseTicketCtrl'
          }
        }
      })

      .state('tab.aboutUs', {
        url: '/aboutUs',
        views: {
          'tab-about-us': {
            templateUrl: 'js/controllers/common/about-us/about-us.html',
            controller: 'AboutUsCtrl'
          }
        }
      })

      .state('tab.makeShows', {
        url: '/makeShows',
        views: {
          'tab-make-shows': {
            templateUrl: 'js/controllers/vendor/make-shows/make-shows.html',
            controller: 'MakeShowsCtrl'
          }
        }
      })

      .state('tab.makeShow', {
        url: '/makeShows/:showId',
        views: {
          'tab-make-shows': {
            templateUrl: 'js/controllers/vendor/make-show/make-show.html',
            controller: 'MakeShowCtrl'
          }
        }
      })

      .state('tab.checkTickets', {
        url: '/checkTickets',
        views: {
          'tab-check-tickets': {
            templateUrl: 'js/controllers/vendor/check-tickets/check-tickets.html',
            controller: 'CheckTicketCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

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
      showTodayButton: false,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: true,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
  .run(function ($rootScope) {
    $rootScope.vendorId = '5853a2983dc77b661dbf364f';
    $rootScope.user = {
      //type: 'business',
      type: 'personal'
    }
  });
