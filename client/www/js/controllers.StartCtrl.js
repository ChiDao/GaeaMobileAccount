define(['app', 'services.RestRoute'], function(app)
{
	app.controller('StartCtrl', ['$scope', 'RestRoute', 'Restangular', 'Auth', 'UI',
		function ($scope, RestRoute, Restangular, Auth, UI) {
			console.log('startCtrl');
			$scope.UI = UI;

			// Auth.testModal("modal-how-to-notification");
			// Auth.login();

			Restangular.setBaseUrl('http://42.120.45.236:8485');
			Restangular.allUrl('client-articles/14a66eaac9ae6457?_last&' + Math.random())
				.getList().then(function(articles){
					$scope.articles = articles.data;
					console.log(JSON.stringify(articles.data));
				}, function(response){
					console.log('Get articles error:' + JSON.stringify(response));
				});

			$scope.RestRoute = RestRoute;
			// RestRoute.getData($scope).then(function(){console.log($scope.apiData)});
			// RestRoute.getLinkData('http://42.120.45.236:8485/game/14a092378763812c', $scope, 'game').then(function(){console.log($scope.game)});
			// RestRoute.jumpToLink('http://42.120.45.236:8485/game/14a092378763812c');
			$scope.start = {
				top_img:"img/data/soul-clash/logo.png",
				top_img_2x:"img/data/soul-clash/logo@2x.png",
				game_icon:"img/data/soul-clash/sotre.png",
				game_icon_2x:"img/data/soul-clash/sotre@2x.png",
				big_img:"img/data/soul-clash/big-photo.png",
				big_img_2x:"img/data/soul-clash/big-photo@2x.png",
				game_name:"Soul Clash",
				game_corp:"Gaea Mobile",
				user_count:"35",
				online_date:"2015.1.15",
				game_content:"DOTA"
			};
		}
	]);
});
