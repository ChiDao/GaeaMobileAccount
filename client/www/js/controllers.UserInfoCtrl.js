angular.module('controllers.UserInfoCtrl',['ionic'])

  .controller('UserInfoCtrl', function ($scope, $state, $ionicNavBarDelegate, Auth) {
	$scope.logout = function(){
		Auth.logout(function(){
			alert('跳回上一页');
		});
	};
  });
