require.config({
    paths: {
  		'cordova': 'cordova',
        'angular': 'lib/angular/angular',
        'purl': 'lib/purl/purl',
        'lodash': 'lib/lodash/dist/lodash',
        'restangular': 'lib/restangular/dist/restangular',

        'app': 'loader.app',
        'services.LiveUpdate': 'js/services.LiveUpdate',
    },
	shim: {
		'corodva': {
			exports: 'cordova'
		},
		'angular': {
			exports: 'angular'
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
	}
});

require
(
    [
        'app',
        'services.LiveUpdate',
    ],
    function(app)
    {
        console.log('bootstrap');
        angular.bootstrap(document, ['loader']);
    }
);