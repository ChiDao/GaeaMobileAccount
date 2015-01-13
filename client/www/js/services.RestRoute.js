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

        getAttrData: [
          {
            name: 'clients',
            deps: ['apiDataField'],
            attr: 'clients',
          },
          {
            name: 'clients-last',
            deps: ['clients'],
            attr: 'last',
            options: {
              extraFilter: {
                platform: 'local.platform'
              },
              toDetail: true
            }
          },
          {
            name: 'client',
            deps: ['clients-last'],
            attr: '_self',
            saveAs: 'client',
          },
          {
            name: 'articles',
            deps: ['client'],
            attr: 'articles',
          },
          {
            name: 'articles-order',
            deps: ['articles'],
            attr: 'last',
            saveAs: 'articles',
          },
        ]
      },
      {
        name: 'game-clients-order',
        apiRegExp: /\/game-clients\/(\w+).*(_first|_last)\=/,
        apiRegExpMap: ['gameId', 'order'],
        api: 'game-clients/<%= gameId %>?<%= order %>=',
        apiType: 'list',
      },
      {
        name: 'game-clients',
        apiRegExp: /\/game-clients\/(\w+)/,
        apiRegExpMap: ['gameId'],
        api: 'game-clients/<%= gameId %>',
        apiType: 'detail',
      },
      {
        name: 'game-client',
        apiRegExp: /\/client\/(\w+)/,
        apiRegExpMap: ['clentId'],
        api: 'client/<%= clentId %>',
        apiType: 'detail',
      },
      {
        name: 'client-articles-order',
        apiRegExp: /\/client-articles\/(\w+).*(_first|_last)\=/,
        apiRegExpMap: ['clentId', 'order'],
        api: 'client-articles/<%= clentId %>?<%= order %>=',
        apiType: 'list',
      },
      {
        name: 'client-articles',
        apiRegExp: /\/client-articles\/(\w+)/,
        apiRegExpMap: ['clentId'],
        api: 'client-articles/<%= clentId %>',
        apiType: 'detail',
      },
    ];

    this.$get = function(Restangular, Auth, $state, $stateParams){
      Restangular.setBaseUrl(serverAddress);
      return {
        getData: function($scope, scopeDataField){
          var getLinkData = this.getLinkData;
          //获取当前路由对应的api数据
          return Thenjs(function(defer){
            scopeDataField = scopeDataField || 'apiData';
            $scope.apiDataField = scopeDataField;
            var apiConfig = _.find(apiConfigs, function(apiConfig) {
              return apiConfig.state == $state.current.name;
            });
            if (apiConfig.apiType === 'list'){
              Restangular.allUrl(_.template(apiConfig.api,$stateParams)).getList().then(function(response){
                $scope[scopeDataField] = response.data;
                defer(undefined, apiConfig);
              });
            }
            else if (apiConfig.apiType === 'detail'){
              Restangular.oneUrl(_.template(apiConfig.api,$stateParams)).get().then(function(response){
                $scope[scopeDataField] = response.data.rawData;
                defer(undefined, apiConfig);
              });
            }
          })
          .then(function(defer, apiConfig){
            //获取属性设置的数据
            if (apiConfig['getAttrData']){
              var solvedAttrs = ['apiDataField'];
              var tmpData = {};
              var fetchData = function(){
                var tmpAttrData = [];
                //查找未获取且依赖已解决的属性
                _.forEach(apiConfig['getAttrData'], function(attrData){
                  if (!_.contains(solvedAttrs, attrData.name) && !_.difference(attrData.deps, solvedAttrs).length){
                    tmpAttrData.push(attrData);
                  }
                });
                async.each(tmpAttrData, function(attrData,callback){
                  console.log(attrData.name);
                  var apiLink;
                  //检查属性是否存在
                  if (attrData.deps[0] === 'apiDataField'){
                    if (!_.has($scope[$scope.apiDataField], attrData.attr)){
                      callback("Api attr " + attrData.attr + " not found");
                    }else{
                      apiLink = $scope[$scope.apiDataField][attrData.attr];
                    }
                  }
                  else {
                    if (!_.has(tmpData[attrData.deps[0]], attrData.attr)){
                      callback("Temp attr " + attrData.attr + " not found");
                    }else{
                      apiLink = tmpData[attrData.deps[0]][attrData.attr];
                    }
                  }
                  //获取数据
                  console.debug('Getting link data: ' + apiLink);
                  var getDataThen = getLinkData(apiLink, tmpData, attrData.name, attrData.options);
                  getDataThen.then(function(){
                    if (attrData.saveAs){
                      $scope[attrData.saveAs] = tmpData[attrData.name];
                    }
                    solvedAttrs.push(attrData.name);
                    callback(undefined);
                  })
                }, function(error){
                  if (error){
                    console.log('yyyyy')
                    defer(error);
                    return;
                  }
                  // solvedAttrs = _.union(solvedAttrs, tmpAttrData);
                  console.log(solvedAttrs);
                  console.log('xxxxx')

                  // 还有未处理的属性
                  if (solvedAttrs.length != apiConfig['getAttrData'].length + 1){
                    fetchData();
                  }
                  else{
                    defer(undefined);
                  }
                });

              };
              fetchData();
            }
            else{
              defer(undefined);
            }
          });
        },
        getAttrData: function(attr, $scope, scopeDataField){
          if (_.has($scope, 'apiDataField') && _.has($scope[$scope.apiDataField], attr)){
            return this.getLinkData($scope[$scope.apiDataField][attr], $scope, scopeDataField);
          }
        },
        getLinkData: function(apiLink, $scope, scopeDataField, options){
          var params;
          var options = options || {};
          //匹配路由并获得参数
          var apiConfig = _.find(apiConfigs, function(apiConfig) {
            var matches = apiConfig.apiRegExp.exec(apiLink);
            if (matches){
              matches.shift();
              params = _.zipObject(apiConfig.apiRegExpMap, matches);
              console.debug('get link data params: ' + JSON.stringify(params));
              console.log(apiConfig.apiRegExp);
            }
            return matches;
          });
          if (apiConfig.apiType === 'list'){
            return Restangular.allUrl(_.template(apiConfig.api, params)).getList().then(function(response){
              console.debug('get link data options: ' + JSON.stringify(options)); 
              var tmpData = response.data;
              var filter = {};
              _.forOwn(options.extraFilter, function(rule, fieldName){
                if (rule === 'local.platform'){
                  var platform = ionic.Platform.isWebView()?ionic.Platform.platform():'ios';
                  filter[fieldName] = platform;
                }
              });
              console.debug('get link data filter:' + JSON.stringify(filter));
              if (_.keys(filter).length) tmpData = _.filter(tmpData, filter);
              if (options.toDetail){
                $scope[scopeDataField] = tmpData[0];
              }else{
                $scope[scopeDataField] = tmpData;
              }
              console.debug('get link data:' + JSON.stringify($scope[scopeDataField]));
            });
          }
          else if (apiConfig.apiType === 'detail'){
            return Restangular.oneUrl(_.template(apiConfig.api, params)).get().then(function(response){
              $scope[scopeDataField] = response.data.rawData;
              console.debug('get link data:' + JSON.stringify($scope[scopeDataField]));
            })
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


