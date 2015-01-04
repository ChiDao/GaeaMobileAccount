require.config({
    paths: {
  		'cordova': 'cordova',
        'purl': 'lib/purl/purl',
        'lodash': 'lib/lodash/dist/lodash',
        'restangular': 'lib/restangular/dist/restangular',
        'app': 'js/app',
        'routes': 'routes',
        'services.Auth': 'js/services.Auth',
        'services.Modal': 'js/services.Modal',
        'services.Push': 'js/services.Push',
        'services.RestRoute': 'js/services.RestRoute',
        'services.Translation': 'js/services.Translation',

        'controllers.StartCtrl': 'js/controllers.StartCtrl',
        'controllers.GamesCtrl': 'js/controllers.GamesCtrl',
        'controllers.GameCtrl': 'js/controllers.GameCtrl',
        'controllers.PlaylistsCtrl': 'js/controllers.PlaylistsCtrl',
        'controllers.PlaylistCtrl': 'js/controllers.PlaylistCtrl',
        'controllers.LoginCtrl': 'js/controllers.LoginCtrl',
        'controllers.UserInfoCtrl': 'js/controllers.UserInfoCtrl',
        'controllers.AppCtrl': 'js/controllers.AppCtrl',
        'services.Games': 'js/services.Games',
    },
	shim: {
		'corodva': {
			exports: 'cordova'
		},
        'purl': {
            exports: 'purl'
        },
        'lodash': {
            exports: '_'
        },
        'restangular': {
            deps: ['lodash'],
            exports: 'Restangular'
        },
		'app': {
			deps: ['cordova', 'purl', 'restangular']
		},
        'routes': {
            deps: [
                'controllers.StartCtrl',
                'controllers.GamesCtrl',
                'controllers.GameCtrl',
                'controllers.PlaylistCtrl',
                'controllers.PlaylistsCtrl',
                'controllers.LoginCtrl',
                'controllers.UserInfoCtrl',
                'controllers.AppCtrl',
                'services.Games'
            ]
        },
        // 'services.LiveUpdate': {
        //     deps: ['restangular']
        // },
        // 'controllers': {
        //     deps: ['app']
        // },
        // 'services': {
        //     deps: ['app']
        // }
	}
});

require
(
    [
        'app',

        // 'services.Modal',
        // 'services.Auth',
        // 'services.RestRoute',
        // 'services.Push',
        // 'services.Translation',
        'routes',
        // 'services.LiveUpdate',
        // 'controllers',
        // 'services',
    ],
    function(app)
    {
        console.log('bootstrap');
        angular.bootstrap(document, ['starter']);
    }
);