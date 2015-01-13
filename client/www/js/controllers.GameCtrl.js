define(['app', 'services.RestRoute'], function(app)
{
	app.controller('GameCtrl', ['$scope', '$stateParams', 'UI', 'RestRoute', "$timeout",
		function($scope, $stateParams, UI, RestRoute, $timeout) {
			RestRoute.getData($scope);
		}
	]);
});
