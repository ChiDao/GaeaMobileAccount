define(['app', 'restangular'], function(app)
{
	app.controller('ArticleCtrl', ['$scope', '$stateParams', 'Restangular',
		function($scope, $stateParams, Restangular) {
			Restangular.oneUrl('article-content/' + $stateParams.articleId + '?r=' + Math.random())
				.get().then(function(article){
					$scope.article = article.data.rawData;
					$scope.article.title = $stateParams.articleTitle;
					console.log(JSON.stringify(article.rawData));
				}, function(response){
					console.log('Get articles error:' + JSON.stringify(response));
				});
		}
	]);
});
