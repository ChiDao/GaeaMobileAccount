define(['app', 'services.RestRoute'], function(app)
{
	app.controller('GameCtrl', ['$scope', '$stateParams', 'UI', 'RestRoute', "$timeout",
		function($scope, $stateParams, UI, RestRoute, $timeout) {
			RestRoute.getData($scope, 'game').then(function(){
				console.log(_.keys($scope));
				// RestRoute.getAttrData('clients', $scope, 'clients_order_options').then(function(){console.log($scope.clients_order_options)});
			});
			// RestRoute.getLinkData('http://42.120.45.236:8485/game-clients/14a092378763812c', $scope, 'clients_order_options').then(function(){console.log($scope.clients_order_options)});
		}
	])
   .directive('scrollParent', function ($ionicScrollDelegate) {
        return {
            restrict: 'A',
            scope: {
                scrollParent: '@',
                direction: "@"
            },
            link: function (scope, element, attrs) {
                var geth = $ionicScrollDelegate.$getByHandle(scope.scrollParent),
                    sc;


                function applydrag(drag) {
                    console.log(drag);

                    if(sc){
                        if(scope.direction == "y"){
                            geth.scrollTo(sc.left-drag.gesture.deltaX, 0, false);
                        }
                        else if(scope.direction == "x"){
                            geth.scrollTo(sc.top-drag.gesture.deltaY, 0, false);
                        }
                    }
                }

                element.on('drag', applydrag);
                element.on('dragstart', function (event) {
                    sc = geth.getScrollPosition();
                });

                element.on('dragend', function (event) {
                    sc = false;
                });
            }
        };
    })
	;
});
