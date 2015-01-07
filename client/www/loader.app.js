
define([
	'angular',
    'cordova',
    'purl',
    'restangular',
    ], function(){

      var loader = angular.module('loader', ['restangular']);

      loader.run(function(LiveUpdate){
        console.log('start loader');
        document.addEventListener(
          'deviceready', 
          function(){
            console.log('load index.html');
            LiveUpdate.loadIndex();
          }, 
          false
        );

      });

      return loader;
});

