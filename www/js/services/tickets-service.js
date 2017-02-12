angular.module('starter.services')
  .factory('Tickets', ['$http', function ($http) {
    var TICKETS = [{
      "_id": "572bda4df843ec053c061bf5",
      "companyName": "Paramount",
      "company_id": "572bda4df843ec053c061bf5",
      "movieName": "Prisoners",
      "time": "8:00 pm"
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
