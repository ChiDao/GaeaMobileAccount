angular.module('controllers.FriendsCtrl', [])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
});