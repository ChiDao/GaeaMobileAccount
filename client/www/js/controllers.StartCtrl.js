define(['app'], function(app)
{
	app.controller('StartCtrl', function ($scope, RestRoute, Restangular) {
		console.log('startCtrl');
		RestRoute.initController($scope);
			$scope.jumpApiAttr('url');
			Restangular.oneUrl('start', 'http://42.120.45.236:8485/start').get().then(function(data){
				$scope.restData = data;
	  	// RestRoute.jumpFirstApiLink($scope.restData);
			},
			function(error){
			console.log("Restangular error:" + JSON.stringify(error));
		})
	});
});
