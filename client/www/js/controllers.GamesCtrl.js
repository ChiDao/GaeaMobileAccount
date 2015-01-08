define(['app'], function(app)
{
	app.controller('GamesCtrl', ['$scope', 'Games',
		function($scope, Games) {
		  $scope.games = Games.all();
		}
	]);
});