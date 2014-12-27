angular.module('controllers.LoginCtrl',['restangular'])

  .controller('LoginCtrl', function ($scope, Restangular) {
  	$scope.restCommitData = {};
    $scope.restCommit = function(){
    	Restangular.allUrl('login', 'http://42.120.45.236:8485/login').post($scope.restCommitData).then(function(data){
    		console.log('Login OK, Get Return Data' + data);
    	},function(error){
    		console.log('Login Error: ' + error)
    	});
    }
  });
