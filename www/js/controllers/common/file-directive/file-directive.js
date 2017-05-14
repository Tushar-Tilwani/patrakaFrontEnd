angular.module('starter.controllers')
  .directive('fileInput', function () {
    return {
      restrict: 'AE',
      templateUrl: 'js/controllers/common/file-directive/file-directive.html',
      controller: 'FileUploadController',
      scope: {
        fileOptions: '='
      },
      link: function (scope, el, attrs) {
        el.bind('change', function (event) {
          var files = event.target.files;
          var file = files[0];
          if (file && typeof(file) !== undefined && file.size > 0) {
            scope.file = file;
            // scope.$parent.fileOptions.file = file
          } else {
            scope.file = {};
            // scope.$parent.file = {};
          }
          scope.$apply();
        });
      }
    }
  })

  .controller('FileUploadController', function ($scope, $ionicLoading) {
    var imageUploader = new ImageUploader();
    $scope.result = {};
    $scope.file = {};
    $scope.fileOptions.upload = function () {
      return imageUploader.push($scope.file)
        .then((data) => {
          console.debug('Upload complete. Data:', data);
          $scope.result.url = data.url;
          $scope.$digest();
          return data.url;
        })
        .catch((err) => {
          console.error(err);
          $ionicLoading.hide();
          $scope.result.error = err;
          return err;
        });
    }
  });
