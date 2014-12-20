angular.module('starter.controllers', ['restangular'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Restangular) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login:' + JSON.stringify($scope.loginData));
    Restangular.allUrl("login", "http://192.168.1.144:3000/api/1.0.0/sessions").post($scope.loginData).then(function(data){
      console.log('get data:' + JSON.stringify(data));
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    })


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});



