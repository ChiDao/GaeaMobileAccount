define(['app', 'services.Auth'], function(app)
{
	app.controller('AppCtrl', function($scope, Auth) {
	  // Form data for the login modal
	  $scope.loginData = {};
	  $scope.isLoggedIn = Auth.isLoggedIn;
	  $scope.Auth = Auth;
      var userData = (localStorage.getItem('user') === null?{a:1}:JSON.parse(localStorage.getItem('user')));
	  $scope.loginUser = userData.email;

	});
});