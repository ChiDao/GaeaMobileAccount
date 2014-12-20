angular.module('controllers.<%= objectControllerName %>', [])

.controller('<%= objectControllerName %>', function($scope, $stateParams, <%= serviceName %>) {
  $scope.<%= objectName %> = <%= serviceName %>.get($stateParams.<%= objectName %>Id);
});
