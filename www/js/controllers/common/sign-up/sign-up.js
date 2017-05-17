angular.module('starter.controllers')
  .controller('SignUpCtrl', function ($scope, $ionicPopup, $location, Users, $ionicLoading, $rootScope) {
    "use strict";
    $scope.fileOptions = {};

    $scope.user = {
      gender: 'Female'
    };

    $scope.extra = {};

    let gotoHomePage = function () {
      if ($rootScope.user.type === 'vendor') {
        $location.path('/vendor/checkTickets')
      } else if ($rootScope.user.type === 'admin') {
        $location.path('/admin/listMovies');
      } else {
        $location.path('/user/home');
      }
    };

    function validations() {
      let cm = $scope.user;

      let keys = ["first_name", "last_name", "email", "gender", "user_name", "password", "phone"];

      let isValid = true;
      _.forEach(keys, function (key) {
        if (!_.get(cm, key)) {
          $ionicPopup.alert({
            title: 'Validation Failed',
            template: 'Please input value for ' + key
          });
          isValid = false;
          return isValid;
        }
      });

      return isValid;
    }

    function moreValidations() {

      if (!validateEmail($scope.user.email)) {
        $ionicPopup.alert({
          title: 'Validation Failed',
          template: 'Please input a valid email'
        });
        return false;
      }

      if (!_.isEqual($scope.user.password, $scope.extra.confirmPassword)) {
        $ionicPopup.alert({
          title: 'Validation Failed',
          template: 'Password and Confirm password should match'
        });
        return false;
      }

      return true;
    }

    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    $scope.createAccount = function () {
      if (!validations()) {
        return;
      }
      if (!moreValidations()) {
        return;
      }
      let user = $scope.user;

      $ionicLoading.show({
        template: 'Uploading...'
      });

      Users.checkUserName(user.user_name)
        .then(function (response) {
          if (!_.isEmpty(response.data)) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Validation Failed',
              template: 'UserName Already exist'
            });
            return;
          }

          $scope.fileOptions.upload() //Function defined in file-directive.js
            .then(function (url) {
              _.set(user, 'avatar', url);
              Users.registerUser(user)
                .then(function (response) {
                  if (response.data) {
                    $ionicLoading.hide();
                    $rootScope.user = response.data;
                    localStorage.setItem('user', JSON.stringify($rootScope.user));
                    gotoHomePage();
                  }
                })
                .catch(function () {
                  $ionicLoading.hide();
                });
            });
        })
        .finally(function () {
          $ionicLoading.hide();
        });

    };

  });


// var f = {
//   "_id": "584de17321add78d386816dc",
//   "first_name": "Martha",
//   "last_name": "Black",
//   "email": "mblack1@patch.com",
//   "gender": "Female",
//   "ip_address": "195.110.142.53",
//   "user_name": "mblack1",
//   "password": {
//     "salt": "dBeOvfenU1WJc863ucM1/2diy0ynBqBVzpkKAyd8qVtP5UlWRRij3QyYOZaMFrp0nudXmiOR9IynCepS2T4zVAdbQ1z/dnizMsO6cI8+ANCtnpsuZL+UJuykK/zQeyHfGu3V3PKzhY6U5vItw++uB8iQKYdcM1LXA+W4nKqmp9E=",
//     "hash": "4iKM+qeNeNLUmElucR4geItaQP+f2DjvThUawghk3gcepIGd8RNcxeLghnYoPU4bL06CvqoG/ElPnBQQd3w0bjWx6SXjDNdrDXRQZb0MX7Tq5ZSqGcMLo8Dhe4WUZQFkNHZGYdxOeslHyBJ3iYgU2i/Qn2tdP/L/mANUhAN1meI="
//   },
//   "balance": 148.59,
//   "avatar": "https://robohash.org/consequunturnemoin.png?size=200x200&set=set1",
//   "phone": "+01-984-858-1836",
//   "token": ("591b0052a7eaa918239b3bf4"),
//   "updated_at": ("2017-05-16T15:27:08.323Z")
// };
