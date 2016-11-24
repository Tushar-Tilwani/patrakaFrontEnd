angular.module('starter.services')
  .factory('Vendors', ['$http', function ($http) {
    var VENDORS = [
      {
        "_id": "572bda4df843ec053c061bf5",
        "companyName": "George Eastman Museum",
        "location": {
          "lat": 43.152836,
          "lng": -77.58008
        },
        "rating": 4.4,
        "types": [
          "movie_theater",
          "museum",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "900 East Avenue, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 27,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 15,
            "tickets": []
          }
        ],
        "id": "7a2880832fa7fa92da0b9873083c4a828bfdf8a8",
        "image": "7a2880832fa7fa92da0b9873083c4a828bfdf8a8.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bf6",
        "companyName": "AMC Webster 12",
        "location": {
          "lat": 43.201923,
          "lng": -77.49391
        },
        "rating": 4.4,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "2190 Empire Boulevard, Webster",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 12,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 11,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 5,
            "tickets": []
          }
        ],
        "id": "304f86de2ae93324b4069af115d86680d041dc67",
        "image": "304f86de2ae93324b4069af115d86680d041dc67.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bf7",
        "companyName": "Cinemark Movies 10",
        "location": {
          "lat": 43.100555,
          "lng": -77.631065
        },
        "rating": 4.3,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "2609 West Henrietta Road, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 6,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 15,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 5,
            "tickets": []
          }
        ],
        "id": "cc325d25affc2aaa38fae5499f6b29fb22005e17"
      },
      {
        "_id": "572bda4df843ec053c061bf8",
        "companyName": "Regal Cinemas Henrietta 18",
        "location": {
          "lat": 43.083252,
          "lng": -77.62607
        },
        "rating": 3.6,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "525 Marketplace Drive, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 7,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 30,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 11,
            "tickets": []
          },
          {
            "ft": 3,
            "ticketsAvailable": 36,
            "tickets": []
          },
          {
            "ft": 4,
            "ticketsAvailable": 10,
            "tickets": []
          }
        ],
        "id": "205c9966cd0112fb2e92e7ada1d659f3924704ad",
        "image": "205c9966cd0112fb2e92e7ada1d659f3924704ad.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bf9",
        "companyName": "The Little Theatre",
        "location": {
          "lat": 43.15605,
          "lng": -77.59794
        },
        "rating": 4.5,
        "types": [
          "movie_theater",
          "cafe",
          "food",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "240 East Avenue #100, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 10,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 21,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 24,
            "tickets": []
          },
          {
            "ft": 3,
            "ticketsAvailable": 32,
            "tickets": []
          },
          {
            "ft": 4,
            "ticketsAvailable": 32,
            "tickets": []
          }
        ],
        "id": "41faf40e5081a76d70ca0d4257fa96517c5cfbe9",
        "image": "41faf40e5081a76d70ca0d4257fa96517c5cfbe9.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bfa",
        "companyName": "Geneseo Theatres",
        "location": {
          "lat": 42.79531,
          "lng": -77.79247
        },
        "rating": 3,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "4180 Lakeville Road, Geneseo",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 25,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 6,
            "tickets": []
          }
        ],
        "id": "e304aad9869c40d5f8e1ffaa81e40ede5d7ae934",
        "image": "e304aad9869c40d5f8e1ffaa81e40ede5d7ae934.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bfb",
        "companyName": "Regal Cinemas Culver Ridge Plaza 16",
        "location": {
          "lat": 43.20286,
          "lng": -77.55685
        },
        "rating": 3,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "2255 East Ridge Road, Irondequoit",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 10,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 24,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 29,
            "tickets": []
          },
          {
            "ft": 3,
            "ticketsAvailable": 16,
            "tickets": []
          }
        ],
        "id": "91b6858163347d78901f6309faad80ec5581e2c9",
        "image": "91b6858163347d78901f6309faad80ec5581e2c9.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bfc",
        "companyName": "Regal Cinemas Greece Ridge 12",
        "location": {
          "lat": 43.20516,
          "lng": -77.68869
        },
        "rating": 4.1,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "176 Greece Ridge Center Drive, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 2,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 11,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 28,
            "tickets": []
          }
        ],
        "id": "a92ed4a9623c6344b16e279485853c59de036180",
        "image": "a92ed4a9623c6344b16e279485853c59de036180.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bfd",
        "companyName": "Cinema Theatre",
        "location": {
          "lat": 43.139343,
          "lng": -77.59603
        },
        "rating": 4.7,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "957 South Clinton Avenue, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 16,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 11,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 24,
            "tickets": []
          },
          {
            "ft": 3,
            "ticketsAvailable": 28,
            "tickets": []
          },
          {
            "ft": 4,
            "ticketsAvailable": 18,
            "tickets": []
          }
        ],
        "id": "aa443d8b3000f1b8b5c7997c03639b35c65ccdf5"
      },
      {
        "_id": "572bda4df843ec053c061bfe",
        "companyName": "Regal Cinemas Eastview Mall 13",
        "location": {
          "lat": 43.0251,
          "lng": -77.44528
        },
        "rating": 3.2,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "70 Eastview Mall Drive, Victor",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 1,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 30,
            "tickets": []
          }
        ],
        "id": "ea96b6efe6bfd8f3371c85f54701f64e156e1740",
        "image": "ea96b6efe6bfd8f3371c85f54701f64e156e1740.jpg"
      },
      {
        "_id": "572bda4df843ec053c061bff",
        "companyName": "Brockport Strand Theater",
        "location": {
          "lat": 43.214554,
          "lng": -77.93835
        },
        "rating": 4.1,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "93 Main Street, Brockport",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 35,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 22,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 9,
            "tickets": []
          }
        ],
        "id": "914afce06edf0da63d59653881fe7672dbfa5456",
        "image": "914afce06edf0da63d59653881fe7672dbfa5456.jpg"
      },
      {
        "_id": "572bda4df843ec053c061c00",
        "companyName": "Vintage Drive In",
        "location": {
          "lat": 42.915092,
          "lng": -77.70753
        },
        "rating": 4.4,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "1520 West Henrietta Road, Avon",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 36,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 25,
            "tickets": []
          }
        ],
        "id": "03c0d2a3aa221484119dfc1cf59667f581ff2feb",
        "image": "03c0d2a3aa221484119dfc1cf59667f581ff2feb.jpg"
      },
      {
        "_id": "572bda4df843ec053c061c01",
        "companyName": "Dryden Theatre",
        "location": {
          "lat": 43.152554,
          "lng": -77.580215
        },
        "rating": 4.7,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "900 East Avenue, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 1,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 13,
            "tickets": []
          }
        ],
        "id": "4ee1a87ec0a0f1255f54dfb96bdeebe4e18fc7b6",
        "image": "4ee1a87ec0a0f1255f54dfb96bdeebe4e18fc7b6.jpg"
      },
      {
        "_id": "572bda4df843ec053c061c02",
        "companyName": "Canandaigua Theatres",
        "location": {
          "lat": 42.87646,
          "lng": -77.24452
        },
        "rating": 2.5,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "3189 County Road 10, Canandaigua",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 12,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 22,
            "tickets": []
          }
        ],
        "id": "456233c0d743451bbfe7c11a23c7f50ebc20c598"
      },
      {
        "_id": "572bda4df843ec053c061c03",
        "companyName": "Xdefenders LLC",
        "location": {
          "lat": 43.04997,
          "lng": -77.46865
        },
        "rating": null,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "1100 Pittsford Victor Road, Pittsford",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 15,
            "tickets": []
          }
        ],
        "id": "b58f330529d1306c3499697d5a9607fdd2c1d825"
      },
      {
        "_id": "572bda4df843ec053c061c04",
        "companyName": "Batavia Showtime",
        "location": {
          "lat": 42.99886,
          "lng": -78.183716
        },
        "rating": 4,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "6 Alva Place, Batavia",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 8,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 30,
            "tickets": []
          }
        ],
        "id": "c3b72235e5e0810dfdb974fb87e624f001abf944"
      },
      {
        "_id": "572bda4df843ec053c061c05",
        "companyName": "Canaltown Theater",
        "location": {
          "lat": 43.068813,
          "lng": -77.28702
        },
        "rating": 4.3,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "1900 New York 31, Macedon",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 13,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 7,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 18,
            "tickets": []
          },
          {
            "ft": 3,
            "ticketsAvailable": 2,
            "tickets": []
          }
        ],
        "id": "95f740c0b00081fb2211289beb9762df82848fc9"
      },
      {
        "_id": "572bda4df843ec053c061c06",
        "companyName": "Pittsford Cinema 9",
        "location": {
          "lat": 43.101,
          "lng": -77.54146
        },
        "rating": 4,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "3349 Monroe Avenue, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 17,
            "tickets": []
          }
        ],
        "id": "9f2c78b7566ecdd164d807ce2c70ba0cd853ca07"
      },
      {
        "_id": "572bda4df843ec053c061c07",
        "companyName": "Patriotic Portraits",
        "location": {
          "lat": 43.216267,
          "lng": -77.55621
        },
        "rating": null,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "42 Seneca Road, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 1,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 7,
            "tickets": []
          }
        ],
        "id": "d47d3e3bedb66a473917df5694e81b90b2094719"
      },
      {
        "_id": "572bda4df843ec053c061c08",
        "companyName": "Cinemark Tinseltown USA and IMAX",
        "location": {
          "lat": 43.142933,
          "lng": -77.71376
        },
        "rating": 4.4,
        "types": [
          "movie_theater",
          "point_of_interest",
          "establishment"
        ],
        "type": "Movie Theater",
        "vicinity": "2291 Buffalo Road, Rochester",
        "dates": [
          {
            "ft": 0,
            "ticketsAvailable": 33,
            "tickets": []
          },
          {
            "ft": 1,
            "ticketsAvailable": 11,
            "tickets": []
          },
          {
            "ft": 2,
            "ticketsAvailable": 13,
            "tickets": []
          },
          {
            "ft": 3,
            "ticketsAvailable": 19,
            "tickets": []
          },
          {
            "ft": 4,
            "ticketsAvailable": 35,
            "tickets": []
          }
        ],
        "id": "da642713f10d9b817bce7fa7739a9194059d32ae",
        "image": "da642713f10d9b817bce7fa7739a9194059d32ae.jpg"
      }
    ]
    return {
      all: function () {
        return VENDORS;
      },
      remove: function (vendor) {
        VENDORS.splice(VENDORS.indexOf(vendor), 1);
      },
      get: function (_id) {
        for (var i = 0; i < VENDORS.length; i++) {
          if (VENDORS[i]._id == _id) {
            return VENDORS[i];
          }
        }
        return null;
      }
    };
  }]);
