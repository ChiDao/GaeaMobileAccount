angular.module('controllers.GamesCtrl', [])

.controller('GamesCtrl', function($scope, Games) {
  $scope.games = Games.all();
});