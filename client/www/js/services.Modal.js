define(['app'], function(app)
{
  	app.service('Modal', function ($ionicModal, $rootScope) {
    
	  var init = function(tpl, $scope) {

	    var promise;
	    $scope = $scope || $rootScope.$new();

	    promise = $ionicModal.fromTemplateUrl(tpl, {
	      scope: $scope,
	      backdropClickToClose: false,
	      hardwareBackButtonClose: false,
	      animation: 'slide-in-up'
	    }).then(function(modal) {
	      $scope.modal = modal;
	      return modal;
	    });

	    $scope.openModal = function() {
	       $scope.modal.show();
	     };
	     $scope.closeModal = function() {
	     	if (_.isFunction($scope.onClose)) $scope.onClose();
	     	//Todo: handle放在一个数组里，统一进行清理
	      	$scope.onSuccess = undefined;
	      	$scope.onError = undefined;
	      	$scope.onClose = undefined;
	      	$scope.onCancel = undefined;
	       	$scope.modal.hide();
	     };
	     $scope.cancelModal = function(){
	     	if (_.isFunction($scope.onCancel)) $scope.onCancel();
	     	//Todo: handle放在一个数组里，统一进行清理
	       	$scope.modal.hide();
	      	$scope.onSuccess = undefined;
	      	$scope.onError = undefined;
	      	$scope.onClose = undefined;
	      	$scope.onCancel = undefined;
	     };
	     $scope.$on('$destroy', function() {
	       $scope.modal.remove();
	     });

	    return promise;
	  };

	  var okCancelModal = function(template, options, eventHandles){
	  	options = options || {};
	  	var scope = $rootScope.$new();
	  	eventHandles.init? (function(){
	  		  		console.debug('OkCancleModal init');
	  		  		eventHandles.init(scope)
	  		  	})(): undefined;
	  	options.scope = scope;
	  	return Thenjs(function(defer){
	  		$ionicModal.fromTemplateUrl(template, options).then(function(modal) {
	  			scope.modal = modal;
			  	scope.ok = function(form){
			  		console.debug('OkCancleModal ok');
			  		if (_.isFunction(eventHandles.onOk)){
			  			eventHandles.onOk(form, scope);
			  		}else{
			  			modal.hide();
			  		}

			  	}
			  	scope.hideModal = function(){
			  		modal.hide();
			  	}
			  	scope.closeModal = function(){
			  		console.debug('OkCancleModal closeModal');
			  		if (_.isFunction(eventHandles.onClose)){
			  			eventHandles.onClose(scope);
			  		}else{
			  			modal.hide();
			  		}
			  	}
			  	scope.cancelModal = function(){
			  		console.debug('OkCancleModal cancelModal');
			  		if (_.isFunction(eventHandles.onCancel)){
			  			eventHandles.onCancel(scope);
			  		}else{
			  			modal.hide();
			  		}
			  	}
	  			modal.show();
	  			defer(undefined, scope, modal);
	  		});
	  	});
	  }

	  return {
	    init: init,
	    okCancelModal: okCancelModal,
	  };
  });
});
