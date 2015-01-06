
define(['app'], function(app){

  app.config(function($stateProvider, $urlRouterProvider) {


    var access = app.routingConfig.accessLevels;

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

        .state('app.games', {
        url: '/games',
        views: {
          'menuContent': {
            templateUrl: 'templates/games.html',
            controller: 'GamesCtrl'
          }
        },
        data: {
          access: access.public
        }
      })


        .state('app.game', {
        url: '/games/:gameId' ,
        views: {
          'menuContent': {
            templateUrl: 'templates/game.html',
            controller: 'GameCtrl'
          }
        },
        data: {
          access: access.public
        }
      })



        .state('app.start', {
        url: '/start',
        views: {
          'menuContent': {
            templateUrl: 'templates/start.html', //第一頁
            controller: 'StartCtrl'
          }
        },
        data: {
          access: access.public
        }
      })


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

    .state('app.all-done', {
      url: "/all-done",
      views: {
        'menuContent': {
          templateUrl: "templates/all-done.html"
        }
      },
      data: {
        access: access.public
      }
    })

    .state('app.modal-allow-notification', {
      url: "/modal-allow-notification",
      views: {
        'menuContent': {
          templateUrl: "templates/modal-allow-notification.html"
        }
      },
      data: {
        access: access.public
      }
    })  

    .state('app.article', {
      url: "/article",
      views: {
        'menuContent': {
          templateUrl: "templates/article.html"
        }
      },
      data: {
        access: access.public
      }
    })    

    .state('app.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "templates/about.html"
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
    if (localStorage.getItem('user') !== null){
      $urlRouterProvider.otherwise('/app/games/1');
    }else{
      $urlRouterProvider.otherwise('/app/start');
    }
  });
});
