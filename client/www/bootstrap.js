require.config({
    paths: {
  		'cordova': 'cordova',
        // 'purl': 'lib/purl/purl',
        'lodash': 'lib/lodash/dist/lodash',
        'restangular': 'lib/restangular/dist/restangular',
        'angular-messages': 'lib/angular-messages/angular-messages',
        'angular-translate': 'lib/angular-translate/angular-translate',
        'angular-translate-handler-log': 'lib/angular-translate-handler-log/angular-translate-handler-log',
        'angular-cookies': 'lib/angular-cookies/angular-cookies',
        'angular-translate-storage-cookie': 'lib/angular-translate-storage-cookie/angular-translate-storage-cookie',
        'angular-translate-storage-local': 'lib/angular-translate-storage-local/angular-translate-storage-local',

        'app': 'js/app',
        'routes': 'js/app.routes',
        'config': 'js/app.config',

        'services.Auth': 'js/services.Auth',
        'services.Modal': 'js/services.Modal',
        'services.Push': 'js/services.Push',
        'services.RestRoute': 'js/services.RestRoute',
        'services.Translation': 'js/services.Translation',
        'services.LiveUpdate': 'js/services.LiveUpdate',

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
        // 'purl': {
        //     exports: 'purl'
        // },
        'lodash': {
            exports: '_'
        },
        'restangular': {
            deps: ['lodash'],
            exports: 'Restangular'
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
	}
});

require
(
    [
        'app',

        'services.Modal',
        'services.Auth',
        'services.RestRoute',
        'services.Push',
        'services.Translation',
        'services.LiveUpdate',
        'routes',
        'config',
    ],
    function(app)
    {
        console.log('bootstrap');
        angular.bootstrap(document, ['starter']);
    }
);