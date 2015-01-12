define(['app'], function(app)
{
    app.provider('RestRoute', function($stateProvider) {
    // Might use a resource here that returns a JSON array

    var serverAddress = 'http://42.120.45.236:8485/';

    var apiConfigs = [
      {
        name: 'start',
        api: 'start',
        apiRegExp: /\/start/,
        apiType: 'detail',
        state: 'app.start'
      },
      {
        name: 'game',
        api: 'game/:gameId',
        apiRegExp: /\/game\/\w+/,
        apiType: 'detail',
        state: 'app.game',

        // stateUrl: '/get-password',
        // templateUrl: 'templates/get-password.html',
        // controller: 'StartCtrl'
      },
    ];

    this.$get = function(Restangular, Auth, $state){
      Restangular.setBaseUrl(serverAddress);
      return {
        //获取当前路由对应的api数据
        getData: function($scope, scopeDataField){
          scopeDataField = scopeDataField || 'apiData';
          var apiConfig = _.find(apiConfigs, function(apiConfig) {
            return apiConfig.state == $state.current.name;
          });
          if (apiConfig.apiType === 'list'){
            return Restangular.allUrl(apiConfig.api).getList().then(function(response){
              $scope[scopeDataField] = response.data;
            });
          }
          else if (apiConfig.apiType === 'detail'){
            return Restangular.oneUrl(apiConfig.api).get().then(function(response){
              $scope[scopeDataField] = response.data.rawData;
            });
          }
        },
        getLinkData: function(apiLink){
          var apiConfig = _.find(apiConfigs, function(apiConfig) {
            return apiConfig.apiRegExp.test(apiLink);
          });
          if (apiConfig.apiType === 'list'){
            return Restangular.allUrl(apiConfig.api).getList().then(function(response){
              $scope[scopeDataField] = response.data;
            });
          }
          else if (apiConfig.apiType === 'detail'){
            return Restangular.oneUrl(apiConfig.api).get().then(function(response){
              $scope[scopeDataField] = response.data.rawData;
            });
          }
        },
        //根据api跳转到对应的state
        jumpToLink: function(apiLink){
          var state = this.getStateFromApiLink(apiLink);
          if (state){
            $state.go(state);
          }
        },
        //从api链接找到对应的state
        getStateFromApiLink: function(apiLink){
          var apiConfig = _.find(apiConfigs, function(apiConfig) {
            return apiConfig.apiRegExp.test(apiLink);
          });
          console.log(apiConfig);
          return apiConfig === undefined? undefined:apiConfig.state;
        },



        initController: function($scope){
          $scope.jumpApiAttr = function(attr){
            console.log(attr);
            // var apiLink = $scope.restData['attr'];
            // $state.go(this.getStateFromApiLink(apiLink));
          }
        },
        jumpFirstApiLink: function(restData){
          var firstLink = restData.rawData[_.findKey(restData.rawData, function(value) {
            return /^(http|https)\:\/\//.test(value);
          })];
          $state.go(this.getStateFromApiLink(firstLink));
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
    // RestRoute.createRoute();
  });
});


