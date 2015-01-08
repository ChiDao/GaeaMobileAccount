define(['app', 'restangular'], function(app)
{
	app.controller('GameCtrl', ['$scope', '$stateParams', 'UI', 'Restangular',
		function($scope, $stateParams, UI, Restangular) {
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
		}
	]);
});
