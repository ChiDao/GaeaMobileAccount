
define(['app', 'restangular'], function(app){

  app.config(function(RestangularProvider) {

      RestangularProvider.setDefaultHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
      });
      RestangularProvider.setDefaultHttpFields({
        withCredentials: true
      });

      RestangularProvider.setFullResponse(true);
      RestangularProvider.setBaseUrl('http://42.120.45.236:8485');
      // RestangularProvider.setBaseUrl('http://localhost:8485');

      // add a response intereceptor
      RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData;      // .. to look for getList operations
        if (operation === "getList") {
          // .. and handle the data and meta data
          extractedData = data.splices;
          //extractedData.meta = data.data.meta;
        } else {
          extractedData = {'rawData': data};
        }
        return extractedData;
      });

      
      RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        if (response.headers('my-xsrf-header')){
          localStorage.setItem('my-xsrf-header', response.headers('my-xsrf-header'));
        }
      });


      RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig ) {
        if(localStorage.getItem('my-xsrf-header')){
          headers.Authorization = 'Bearer '+ localStorage.getItem('my-xsrf-header');
        }
        return {
          element: element,
          params: _.extend(params, {single: true}),
          headers: headers,
          httpConfig: httpConfig
        };
      });
	});


	//i18n
	app.config(function(TranslationsProvider) {
		TranslationsProvider.translateConfig();
	});
});