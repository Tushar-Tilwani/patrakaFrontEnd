angular.module('starter.services')
  .factory('Tickets', ['$http', 'PROPERTIES', function ($http, PROPERTIES) {
    "use strict";
    var TICKETS = [{
      "_id": "572bda4df843ec053c061bf5",
      "companyName": "Paramount",
      "company_id": "572bda4df843ec053c061bf5",
      "movieName": "Prisoners",
      "time": "8:00 pm"
    }];

    var currentTicket;

    return {
      all: function () {
        return TICKETS;
      },
      get: function (id) {
        return $http.get(PROPERTIES.DOMAIN + 'tickets/' + id);
      },
      remove: function (vendor) {
        TICKETS.splice(TICKETS.indexOf(vendor), 1);
      },
      book: function (ticket) {
        return $http.post(PROPERTIES.DOMAIN + 'tickets', ticket);
      },
      getByUserId: function (userId) {
        return $http.get(PROPERTIES.DOMAIN + 'tickets/user/' + userId);
      },
      setCurrentTicket: function (t) {
        currentTicket = t;
      },
      getCurrentTicket: function () {
        return currentTicket;
      }
    };
  }]);
