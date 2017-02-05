angular.module('starter.services')
  .factory('Tickets', ['$http', function ($http) {
    var TICKETS = [{
      "_id": "572bda4df843ec053c061bf5",
      "companyName": "George Eastman Museum",
      "company_id": "572bda4df843ec053c061bf5",
      "showName": "The Hunger Games",
      "time": "10:30 am"
    }];

    return {
      all: function () {
        return TICKETS;
      },
      remove: function (vendor) {
        TICKETS.splice(TICKETS.indexOf(vendor), 1);
      },
      get: function (_id) {
        for (var i = 0; i < TICKETS.length; i++) {
          if (TICKETS[i]._id == _id) {
            return TICKETS[i];
          }
        }
        return TICKETS[0];
      }
    };
  }]);
