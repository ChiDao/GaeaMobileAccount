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
            deps: ['lodash']
        },
		'app': {
			deps: ['cordova', 'purl', 'restangular']
		},
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
        // 'controllers',
        // 'services',
    ],
    function(app)
    {
        angular.bootstrap(document, ['starter']);
    }
);