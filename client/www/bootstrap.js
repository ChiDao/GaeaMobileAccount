require.config({
    baseUrl: '/js',
    paths: {
  		'cordova': '/cordova',
        'purl': '/lib/purl/purl',
        'restangular': '/lib/restangular/dist/restangular',
        'lodash': '/lib/lodash/dist/lodash',
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
        'services.LiveUpdate': {
            deps: ['restangular']
        }
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

        'controllers.StartCtrl',
        'controllers.GameCtrl',
        'controllers.PlaylistCtrl',
        'controllers.PlaylistsCtrl',
        'controllers.LoginCtrl',
        'controllers.UserInfoCtrl',
        'controllers.AppCtrl',
        'services.Games',

        'services.Modal',
        'services.Auth',
        'services.RestRoute',
        // 'services.LiveUpdate',
        // 'controllers',
        // 'services',
    ],
    function(app)
    {
        angular.bootstrap(document, ['starter']);
    }
);