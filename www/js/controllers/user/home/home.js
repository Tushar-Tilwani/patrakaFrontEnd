angular.module('starter.controllers')
  .controller('HomeCtrl', function ($scope, $ionicSlideBoxDelegate) {

    $scope.data = {};
    $scope.data.bgColors = [];
    $scope.data.currentPage = 0;

    $ionicSlideBoxDelegate.slide(0);

    for (var i = 0; i < 10; i++) {
      $scope.data.bgColors.push("bgColor_" + i);
    }

    // var setupSlider = function() {
    //   //some options to pass to our slider
    //   $scope.data.sliderOptions = {
    //     initialSlide: 0,
    //     direction: 'horizontal', //or vertical
    //     speed: 300 //0.3s transition
    //   };
    //
    //   //create delegate reference to link with slider
    //   $scope.data.sliderDelegate = null;
    //
    //   //watch our sliderDelegate reference, and use it when it becomes available
    //   $scope.$watch('data.sliderDelegate', function(newVal, oldVal) {
    //     if (newVal != null) {
    //       $scope.data.sliderDelegate.on('slideChangeEnd', function() {
    //         $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
    //         //use $scope.$apply() to refresh any content external to the slider
    //         $scope.$apply();
    //       });
    //     }
    //   });
    // };
    //
    // setupSlider();

  });

