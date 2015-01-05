define(['app', 
	'angular-cookies', 
	'angular-translate-storage-local', 
	'angular-translate-storage-cookie',
	'angular-translate-handler-log',
	'angular-translate'
	], function(app)
		{
		    app.provider('Translations', function($translateProvider) {
				var translationsCN = {
				  HEADLINE: '开始',
				  PREREGISTER: '预注册'
				};
				 
				var translationsJP= {
				  //HEADLINE: 'Was für ein großartiges Modul!',
				  PREREGISTER: '予備登録'
				};

				this.translateConfig = function(){
					$translateProvider.translations('jp', translationsJP);
					$translateProvider.translations('cn', translationsCN);
						 // $translateProvider.useMessageFormatInterpolation();
						 $translateProvider.preferredLanguage('jp');
					//	 $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
						 $translateProvider.fallbackLanguage(['jp', 'cn']);
						 $translateProvider.useLocalStorage();
						 $translateProvider.useMissingTranslationHandlerLog();
						 $translateProvider.useSanitizeValueStrategy('escaped');
						 return ;
						};

				this.$get = function() { 
					return {}
				}	
			})


});
