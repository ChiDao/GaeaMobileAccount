define(['app'], function(app)
{
	app.controller('GamesCtrl', function($scope, Games) {
	  $scope.games = Games.all();
	});
});