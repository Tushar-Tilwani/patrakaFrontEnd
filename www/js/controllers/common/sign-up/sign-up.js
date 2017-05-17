angular.module('starter.controllers')
  .controller('SignUpCtrl', function ($scope, $ionicPopup, $location, Users, Vendors, $ionicLoading, _, $rootScope) {
    'use strict';
    $scope.userFileOptions = {file: {}};
    $scope.vendorFileOptions = {file: {}};

    $scope.user = {
      gender: 'Female'
    };

    $scope.extra = {};
    $scope.page = {
      method: null,
      previousMethods: []
    };

    $rootScope.$watch('myLoc', function () {
      $scope.vendor.location = $rootScope.myLoc;
    });


    $scope.vendor = {
      "companyName": "Cinema Theatre",
      "location": $rootScope.myLoc,
      "rating": 4.8,
      "types": [
        "movie_theater",
        "point_of_interest",
        "establishment"
      ],
      "type": "Movie Theater",
      "vicinity": "957 South Clinton Avenue, Rochester",
      "image": "aa443d8b3000f1b8b5c7997c03639b35c65ccdf5.jpg",
      "blacklist": []
    };

    $scope.backBtn = function () {
      $scope.page.method = $scope.page.previousMethods.pop();
    };

    let gotoHomePage = function () {
      if ($rootScope.user.type === 'vendor') {
        $location.path('/vendor/checkTickets')
      } else if ($rootScope.user.type === 'admin') {
        $location.path('/admin/listMovies');
      } else {
        $location.path('/user/home');
      }
    };

    function keysValidations(obj, keys) {
      let isValid = true;
      _.forEach(keys, function (key) {
        if (!_.get(obj, key)) {
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

    function userValidations() {

      let userKeys = ['first_name', 'last_name', 'email', 'gender', 'user_name', 'password', 'phone'];
      if (!keysValidations($scope.user, userKeys)) {
        return false;
      }

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


      if (isImage($scope.userFileOptions.file)) {
        $ionicPopup.alert({
          title: 'Validation Failed',
          template: 'Upload picture for user'
        });
        return false;
      }

      return true;
    }

    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function userCalls() {
      let user = $scope.user;
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

          $scope.userFileOptions.upload() //Function defined in file-directive.js
            .then(function (url) {
              return registerUser(user, url);
            })
            .catch(function () {
              $ionicLoading.hide();
            });
        })
        .finally(function () {
          $ionicLoading.hide();
        });

    }

    function registerUser(user, url) {
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
    }

    $scope.createAccount = function () {
      if (!userValidations()) {
        return;
      }

      $ionicLoading.show({
        template: 'Uploading...'
      });
      if ($scope.page.isVendor) {
        vendorCalls()
          .then(function (response) {
            let vendor = response.data;
            $scope.user.type = 'vendor';
            $scope.user.vendorId = vendor._id;
            return userCalls();
          })
      } else {
        userCalls();
      }

    };


    function vendorValidations() {
      let vendorKeys = ['companyName', 'location.lat', 'location.lng', 'type', 'vicinity'];
      if (!keysValidations($scope.vendor, vendorKeys)) {
        return keysValidations($scope.vendor, vendorKeys);
      }

      if (!isImage($scope.vendorFileOptions.file)) {
        $ionicPopup.alert({
          title: 'Validation Failed',
          template: 'Upload picture for vendor'
        });
        return false;
      }
      return true;
    }

    function vendorCalls() {
      let vendor = $scope.vendor;
      return $scope.vendorFileOptions.upload() //Function defined in file-directive.js
        .then(function (url) {
          _.set(vendor, 'image', url);
          return Vendors.registerVendor(vendor);
        });
    }

    $scope.updatePage = function (page) {
      //if going from vendor to user validate vendor values
      if ($scope.page.isVendor && page === 'user') {
        if (!vendorValidations()) {
          return;
        }
      }
      $scope.page.previousMethods.push($scope.page.method);
      $scope.page.method = page;
    };

    function isImage(file) {
      return file.size && _.startsWith(file.type, 'image');
    }

  });

