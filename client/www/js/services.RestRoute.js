define(['app'], function(app)
{
    app.provider('RestRoute', function($stateProvider) {
    // Might use a resource here that returns a JSON array

    var serverAddress = 'http://42.120.45.236:8485/';

    var apiConfigs = [
      {
        name: 'start',
        api: serverAddress + 'start',
        apiRegExp: /\/start/,
        apiType: 'jumpFirst',
        state: 'app.start'
      },
      {
        name: 'get-password',
        api: serverAddress + 'get-password',
        apiRegExp: /\/get-password/,
        apiType: 'post',

        state: 'app.get-password',
        stateUrl: '/get-password',
        templateUrl: 'templates/get-password.html',
        controller: 'StartCtrl'
      },
      {
        name: 'login',
        api: serverAddress + 'login',
        apiRegExp: /\/login/,
        apiType: 'post',

        state: 'app.login',
        stateUrl: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    ];
    var displayFieldFunc = {
      h1: function(fieldName){
        return '<h1>' + fieldName + '</h1>';
      },
      h3: function(fieldName){
        return '<h3>' + fieldName + '</h3>';
      }
    };

    this.$get = function(Restangular, Auth, $state){
      return {
        start: function(){
          // _.find(apiConfigs, {apiType: 'start'});
          // var apiJson = Restangular.oneUrl()
          // this.jumpByApiAttr
          this.jumpFirstApiLink();
        },
        initController: function($scope){
          $scope.jumpApiAttr = function(attr){
            console.log(attr);
            // var apiLink = $scope.restData['attr'];
            // $state.go(this.getStateFromApiLink(apiLink));
          }
        },
        jumpApiLink: function($scope, attr){
        },
        jumpFirstApiLink: function(restData){
          var firstLink = restData.rawData[_.findKey(restData.rawData, function(value) {
            return /^(http|https)\:\/\//.test(value);
          })];
          $state.go(this.getStateFromApiLink(firstLink));
        },
        getStateFromApiLink: function(apiLink){
          var appConfig = _.find(apiConfigs, function(apiConfig) {
            return apiConfig.apiRegExp.test(apiLink);
          });
          return appConfig === undefined?'app':appConfig.state;
        },
        createRoute: function(){
          // console.log(JSON.stringify(this.allApiStates()['tab.games'].views));
          _.forEach(apiConfigs, function(apiConfig){
            if (apiConfig.name !== 'start'){
              $stateProvider.state(apiConfig.state, {
                url: apiConfig.stateUrl,
                views: {
                  'menuContent': {
                    templateUrl: apiConfig.templateUrl,
                    controller: apiConfig.controller
                  }
                },
                data: {
                  access: Auth.accessLevels.public
                }
              });
            }
          });
        },
      }
    };

  })

  .run(function(RestRoute){
    RestRoute.createRoute();
  });
});

        // createRoute: function(){
        //   // console.log(JSON.stringify(this.allApiStates()['tab.games'].views));
        //   _.forEach(apiConfigs, function(apiConfig){
        //     $stateProvider.state('tab.' + apiConfig.name, {
        //       url: apiConfig.stateUrl,
        //       views: {
        //         'general-view': {
        //           templateProvider: function(RestRoute){
        //             return RestRoute.getHtml(apiConfig.name);
        //           },
        //           controllerProvider: function(RestRoute){
        //             return RestRoute.getController(apiConfig.name);
        //           }
        //         }
        //       }
        //     });
        //   });
        // },
        // getHtml :function(apiConfigName){
        //   //Todo: 正则表达式处理url匹配;
        //     var insertHtml = '';
        //     var apiConfig = _.find(apiConfigs, {name: apiConfigName});
        //     if (!_.isUndefined(apiConfig)){
        //       if (apiConfig.apiType === 'list'){
        //         if (_.isUndefined(apiConfig.itemUrl)){
        //           insertHtml += '<ion-list>' +
        //           '<ion-item ng-repeat="data in datas" type="item-text-wrap">';
        //         }
        //         else{
        //           insertHtml += '<ion-list>' +
        //           '<ion-item ng-repeat="data in datas" type="item-text-wrap" href="' + apiConfig.itemUrl + '">';
        //         }
        //         //根据配置显示属性
        //         _.forEach(apiConfig.displayFields, function(field){
        //           insertHtml += displayFieldFunc[field.displayType]('{{data.' + field.fieldName + '}}');
        //         });
        //         insertHtml += '</ion-item></ion-list>';
        //       }
        //     }
        //     console.log('get html' + insertHtml);
        //     return '<ion-view title="Test">' +
        //              ' <ion-content has-header="true" padding="true">' +
        //              '    ' + insertHtml + 
        //              '  </ion-content>' +
        //              '</ion-view>';
          
        // },
        // getController: function(apiConfigName){
        //   var apiConfig = _.find(apiConfigs, {name: apiConfigName});
        //   var baseFunc = function($scope, $stateParams){
        //     var api = '';
        //     if (_.isUndefined(apiConfig.stateUrlParams)){
        //       api = apiConfig.api;
        //     }
        //     else{
        //       var templateParams = {};
        //       templateParams[apiConfig.stateUrlParams] = $stateParams[apiConfig.stateUrlParams];
        //       api = _.template(apiConfig.api, templateParams);
        //     }
        //     // console.log('in controller:');
        //     Restangular.allUrl('Data', api).getList().then(function(data){
        //       console.log('in controller:' + JSON.stringify(data));
        //       $scope.datas = data;
        //     })
        //   };
        //   return baseFunc;
        // }

