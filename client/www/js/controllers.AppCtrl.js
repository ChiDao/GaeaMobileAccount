angular.module('controllers.AppCtrl', [])

.controller('AppCtrl', function($scope, Auth) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.Auth = Auth;

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
});
