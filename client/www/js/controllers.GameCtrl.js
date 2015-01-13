define(['app', 'services.RestRoute'], function(app)
{
	app.controller('GameCtrl', ['$scope', '$stateParams', 'UI', 'RestRoute', "$timeout",
		function($scope, $stateParams, UI, RestRoute, $timeout) {
			RestRoute.getData($scope, 'game').then(function(){
				console.log(_.keys($scope));
				// RestRoute.getAttrData('clients', $scope, 'clients_order_options').then(function(){console.log($scope.clients_order_options)});
			});
			// RestRoute.getLinkData('http://42.120.45.236:8485/game-clients/14a092378763812c', $scope, 'clients_order_options').then(function(){console.log($scope.clients_order_options)});
		}
	]);
});
