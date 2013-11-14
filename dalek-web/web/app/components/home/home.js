angular.module('app.home.home', [
  'app.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('app.home.home', {
      url: '',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  }
])
.controller('HomeCtrl', ['$scope', 'nagNotify', function($scope, nagNotify) {
  var activeId;

  $scope.show = function(vertical, horizontal, passedOptions) {
    passedOptions = passedOptions || {};
    var options = {
      content: 'Test',
      horizontalPosition: horizontal,
      verticalPosition: vertical
    };

    console.log(passedOptions);

    if(passedOptions.closeOnClick || passedOptions.closeOnClick === false) {
      options.closeOnClick = passedOptions.closeOnClick;
    }

    if(passedOptions.closeOnDelay || passedOptions.closeOnDelay === false) {
      options.closeOnDelay = passedOptions.closeOnDelay;
    }

    if(passedOptions.appendSelector) {
      options.appendSelector = passedOptions.appendSelector;
    }

    if(passedOptions.cssPosition) {
      options.cssPosition = passedOptions.cssPosition;
    }

    if(passedOptions.margin) {
      options.margin = passedOptions.margin;
    }

    if(passedOptions.horizontalPosition) {
      options.horizontalPosition = passedOptions.horizontalPosition;
    }

    if(passedOptions.verticalPosition) {
      options.verticalPosition = passedOptions.verticalPosition;
    }

    if(passedOptions.cssClass) {
      options.cssClass = passedOptions.cssClass;
    }

    activeId = nagNotify.notify(options);
  };

  $scope.hide = function(vertical, horizontal) {
    nagNotify.remove(activeId);
  };
}]);
