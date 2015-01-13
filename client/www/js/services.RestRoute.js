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
        apiRegExp: /\/game\/(\w+)/,
        apiRegExpMap: ['gameId'],
        api: 'game/<%= gameId %>',
        apiType: 'detail',
        state: 'app.game',
      },
      {
        name: 'game-clients',
        apiRegExp: /\/game-clients\/(\w+)/,
        apiRegExpMap: ['gameId'],
        api: 'game-clients/<%= gameId %>',
        apiType: 'detail',
      },
    ];

    this.$get = function(Restangular, Auth, $state, $stateParams){
      Restangular.setBaseUrl(serverAddress);
      return {
        //获取当前路由对应的api数据
        getData: function($scope, scopeDataField){
          scopeDataField = scopeDataField || 'apiData';
          $scope.apiDataField = scopeDataField;
          var apiConfig = _.find(apiConfigs, function(apiConfig) {
            return apiConfig.state == $state.current.name;
          });
          if (apiConfig.apiType === 'list'){
            return Restangular.allUrl(_.template(apiConfig.api,$stateParams)).getList().then(function(response){
              $scope[scopeDataField] = response.data;
            });
          }
          else if (apiConfig.apiType === 'detail'){
            return Restangular.oneUrl(_.template(apiConfig.api,$stateParams)).get().then(function(response){
              $scope[scopeDataField] = response.data.rawData;
            });
          }
        },
        getAttrData: function(attr, $scope, scopeDataField){
          if (_.has($scope, 'apiDataField') && _.has($scope[$scope.apiDataField], attr)){
            return this.getLinkData($scope[$scope.apiDataField][attr], $scope, scopeDataField);
          }
        },
        getLinkData: function(apiLink, $scope, scopeDataField){
          var params;
          //匹配路由并获得参数
          var apiConfig = _.find(apiConfigs, function(apiConfig) {
            var matches = apiConfig.apiRegExp.exec(apiLink);
            if (matches){
              matches.shift();
              params = _.zipObject(apiConfig.apiRegExpMap, matches);
            }
            return matches;
          });
          if (apiConfig.apiType === 'list'){
            return Restangular.allUrl(_.template(apiConfig.api, params)).getList().then(function(response){
              $scope[scopeDataField] = response.data;
            });
          }
          else if (apiConfig.apiType === 'detail'){
            return Restangular.oneUrl(_.template(apiConfig.api, params)).get().then(function(response){
              $scope[scopeDataField] = response.data.rawData;
            });
          }
        },
        //根据api跳转到对应的state
        jumpToLink: function(apiLink){
          var params;
          //匹配路由并获得参数
          var apiConfig = _.find(apiConfigs, function(apiConfig) {
            var matches = apiConfig.apiRegExp.exec(apiLink);
            if (matches){
              matches.shift();
              params = _.zipObject(apiConfig.apiRegExpMap, matches);
            }
            return matches;
          });
          if (apiConfig){
            $state.go(apiConfig.state, params);
          }
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

        //从api链接找到对应的state
        getStateFromApiLink: function(apiLink){
          var apiConfig = _.find(apiConfigs, function(apiConfig) {
            return apiConfig.apiRegExp.test(apiLink);
          });
          console.log(apiConfig);
          return apiConfig === undefined? undefined:apiConfig.state;
        },
      }
    };

  })

  .run(function(RestRoute){
    // RestRoute.createRoute();
  });
});


