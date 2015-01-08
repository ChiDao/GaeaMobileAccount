define(['app', 'restangular'], function(app)
{
<<<<<<< HEAD
	app.controller('GameCtrl', ['$scope', '$stateParams', 'UI', 'Restangular', "$timeout",
		function($scope, $stateParams, UI, Restangular, $timeout) {
			$scope.UI = UI;
			$scope.game = {};
			//http://42.120.45.236:8485/client-articles/14a66eaac9ae6457?_last

			Restangular.setBaseUrl('http://42.120.45.236:8485');
			Restangular.allUrl('client-articles/14a66eaac9ae6457?_last&' + Math.random())
				.getList().then(function(articles){
					$scope.articles = articles.data;
					console.log(JSON.stringify(articles.data));
				}, function(response){
					console.log('Get articles error:' + JSON.stringify(response));
				});

			up = new Date(2015,1,10,0,0,0)
			$scope.cd = up - Date.now();
			$scope.onTimeout = function () {
				$scope.cd = up - Date.now();
				mytimeout = $timeout($scope.onTimeout,5000);
			}

			var mytimeout = $timeout($scope.onTimeout,5000);

		}
	]);
});
