require.config({
    baseUrl: '/js',
    paths: {
  		'cordova': '/cordova',
    },
	shim: {
		'corodva': {
			exports: 'cordova'
		},
		'app': {
			deps: ['cordova']
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