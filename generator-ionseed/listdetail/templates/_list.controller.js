angular.module('controllers.<%= objectsControllerName %>', [])

.controller('<%= objectsControllerName %>', function($scope, <%= serviceName %>) {
  $scope.<%= objectsName %> = <%= serviceName %>.all();
});