define(['app'], function(app)
{
	app.controller('GameCtrl', ['$scope', '$stateParams', 'Games', 'UI', "$timeout",
		function($scope, $stateParams, Games, UI, $timeout) {
			
			up = new Date(2015,1,10,0,0,0)
			$scope.cd = up - Date.now();
			$scope.onTimeout = function () {
				$scope.cd = up - Date.now();
				mytimeout = $timeout($scope.onTimeout,5000);
			}

			var mytimeout = $timeout($scope.onTimeout,5000);

			console.log($scope.cd);
			$scope.UI = UI;
			// $scope.game = Games.get($stateParams.gameId);
		}
	]);
});
