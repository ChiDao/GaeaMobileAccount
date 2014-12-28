angular.module('controllers.GameCtrl', [])

.controller('GameCtrl', function($scope, $stateParams, Games) {
  $scope.game = Games.get($stateParams.gameId);
});
