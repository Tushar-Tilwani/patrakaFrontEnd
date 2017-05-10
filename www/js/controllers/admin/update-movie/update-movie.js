angular.module('starter.controllers')
  .controller('UpdateMovieCtrl', function ($scope, Movies, ionicDatePicker, _, moment) {

    var releaseDateObj = {
      callback: function (val) {  //Mandatory
        $scope.releaseDate = moment(_.toInteger(val)).format('LL');
      },
      from: moment().toDate(), //Optional
      to: moment().add(1, 'year').toDate(), //Optional
      inputDate: moment().toDate(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.releaseDatePicker = function () {
      ionicDatePicker.openDatePicker(releaseDateObj);
    };

    $scope.fileName = 'dd';
    $scope.fileSrc = '1.png';

  })
  .directive('fdInput', function () {
    return {
      scope: {
        fileName: '='
      },
      link: function (scope, element, attrs) {
        element.on('change', function (evt) {
          var files = evt.target.files;
          console.log(files[0].name);
          console.log(files[0].size);

          scope.fileName = files[0].name;

          var reader = new FileReader();

          reader.onload = function (e) {
            // scope.fileSrc = e.target.result;
            // scope.$apply();
            $('#fileImg').attr('src', e.target.result);
          };

          reader.readAsDataURL(files[0]);

        });
      }
    }
  });

