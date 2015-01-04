define(['app'], function(app)
{
	app.controller('GameCtrl', function($scope, $stateParams, Games) {
	  $scope.game = Games.get($stateParams.gameId);
	});
});
