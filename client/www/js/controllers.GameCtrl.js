define(['app'], function(app)
{
	app.controller('GameCtrl', ['$scope', '$stateParams', 'Games', 'UI', 
		function($scope, $stateParams, Games, UI) {
			$scope.UI = UI;
			$scope.game = Games.get($stateParams.gameId);
		}
	]);
});
