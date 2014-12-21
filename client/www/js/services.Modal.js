angular.module('services.Modal',['ionic'])

  .service('Modal', function ($ionicModal, $rootScope) {
    
	  var init = function(tpl, $scope) {

	    var promise;
	    $scope = $scope || $rootScope.$new();

	    promise = $ionicModal.fromTemplateUrl(tpl, {
	      scope: $scope,
	      animation: 'slide-in-up'
	    }).then(function(modal) {
	      $scope.modal = modal;
	      return modal;
	    });

	    $scope.openModal = function() {
	       $scope.modal.show();
	     };
	     $scope.closeModal = function() {
	     	_.isFunction($scope.onClose) && $scope.onClose();
	     	//Todo: handle放在一个数组里，统一进行清理
	      	$scope.onSuccess = undefined;
	      	$scope.onError = undefined;
	      	$scope.onClose = undefined;
	      	$scope.onCancel = undefined;
	       	$scope.modal.hide();
	     };
	     $scope.cancelModal = function(){
	     	_.isFunction($scope.onCancel) && $scope.onCancel();
	     	//Todo: handle放在一个数组里，统一进行清理
	       	$scope.modal.hide();
	      	$scope.onSuccess = undefined;
	      	$scope.onError = undefined;
	      	$scope.onClose = undefined;
	      	$scope.onCancel = undefined;
	     }
	     $scope.$on('$destroy', function() {
	       $scope.modal.remove();
	     });

	    return promise;
	  }

	  return {
	    init: init
	  }
  });
