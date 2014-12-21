// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
    //角色配置
    (function(exports){
      var userRoles = {
          public: 1, // 001
          user:   2 // 010
      };
      exports.userRoles = userRoles;
      exports.accessLevels = {
          public: userRoles.public | // 11
                  userRoles.user,
          user:   userRoles.user     // 10
      };
  })(typeof exports === 'undefined'? this['routingConfig']={}: exports);

  var access = routingConfig.accessLevels;

  //路由配置
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  //Should not delete the placeHolder
  //stateProviderPlaceHolder

      .state('app.user-info', {
      url: '/user_info',
      views: {
        'menuContent': {
          templateUrl: 'templates/user-info.html',
          controller: 'UserInfoCtrl'
        }
      },
      data: {
        access: access.user
      }
    })


  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    },
    data: {
      access: access.public
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    },
    data: {
      access: access.user
    }
  })

  .state('app.playlists', {
    url: "/playlists",
    views: {
      'menuContent': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    },
    data: {
      access: access.public
    }
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    },
    data: {
      access: access.public
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})


.controller("MainCtrl", [ '$rootScope', '$location', '$scope', function($rootScope, $location, $scope) {
    $scope.requestAuth = function(url) {
      var parsedUrl = purl(url);  
      var callbackHandle = parsedUrl.param('callbackHandle');
      if(ionic.Platform.isIOS()){
        window.open('gaea00002://?loginData=111111111111', '_system');
      }
      if (ionic.Platform.isAndroid()){
        window.OpenApplication(callbackHandle);
      }
    }
}]);

function handleOpenURL(url) {
    var body = document.getElementsByTagName("body")[0];
    // setTimeout(function(){
    //   alert(1)
    // });
    var mainController = angular.element(body).scope();
    mainController.requestAuth(url);
};
