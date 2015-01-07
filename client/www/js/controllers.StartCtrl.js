define(['app', 'services.RestRoute'], function(app)
{
	app.controller('StartCtrl', function ($scope, RestRoute, Restangular, Auth, UI) {
		console.log('startCtrl');
		$scope.UI = UI;
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
	});
});
