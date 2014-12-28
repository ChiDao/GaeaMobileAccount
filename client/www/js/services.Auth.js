
angular.module('services.Auth', ['restangular'])

/**
 * A simple example service that returns some data.
 */
.factory('Auth', function($rootScope, $timeout, $state, $ionicModal, Restangular, Modal) {
    //Todo: 把定义从app.config移到这里
    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles,
        modalData = {};

    //Todo: 从缓存读取用户信息
    var currentUser = { userName: '', role: routingConfig.userRoles.public };

    //定义输入邮箱对话框
    var signupModalScope = $rootScope.$new();
    signupModalScope.formData = {};
    signupModalScope.commitForm = function(){
      console.log('Doing signUp:' + JSON.stringify(signupModalScope.formData));
      var Signup = Restangular.all('signup');
      Signup.post(signupModalScope.formData).then(function(data){
      console.log('Signup success, get data:' + JSON.stringify(data));
        signupModalScope.modal.hide();
        if (_.isFunction(signupModalScope.onSuccess)) signupModalScope.onSuccess();
      }, function(error){
        console.log('Signup error, get data:' + JSON.stringify(error));
        if (_.isFunction(signupModalScope.onError)) signupModalScope.onError();
      })
    }
    var signupModal = function(){
      Modal
        .init('templates/modal-signup.html', signupModalScope)
        .then(function(modal){
          modal.show();
        });
    };

    //定义登陆对话框
    var preRegistModalScope = $rootScope.$new();
    preRegistModalScope.formData = {};
    preRegistModalScope.commitForm = function(){
      console.log('Doing login:' + JSON.stringify(preRegistModalScope.formData));
      //校验用户名、密码
      //Todo: 访问服务器进行登陆
      var PreRegist = Restangular.all("pre-register");
      PreRegist.post(preRegistModalScope.formData).then(function(data){
        console.log('get data:' + JSON.stringify(data));
        currentUser.userName = preRegistModalScope.formData.userName;
        currentUser.role = userRoles.user;
        console.log('login success.');
        if (_.isFunction(preRegistModalScope.onSuccess)) preRegistModalScope.onSuccess();
        //Todo: 保存到缓存
        $timeout(function() {
          preRegistModalScope.closeModal();
        }, 1000);
      }, function(error){
        console.log('login fail, get data: ' + JSON.stringify(error));
        if (_.isFunction(preRegistModalScope.onError)) preRegistModalScope.onError();
      })
      
    };
    var preRegistModal = function(){
      Modal
        .init('templates/modal-login.html', preRegistModalScope)
        .then(function(modal){
          modal.show();
        });
    };

    //定义开通消息通知对话框
    var allowNotificationModalScope = $rootScope.$new();
    allowNotificationModalScope.ok = function(){
      allowNotificationModalScope.modal.hide();
      if (_.isFunction(allowNotificationModalScope.onOk)) allowNotificationModalScope.onOk();

    }
    var allowNotificationModal = function(){
      Modal
        .init('templates/modal-allow-notification.html', allowNotificationModalScope)
        .then(function(modal){
          modal.show();
        });
    };


    //定义SSO单点登录对话框
    var ssoModalScope = $rootScope.$new();
    var ssoAuthModal = function(){
      Modal
        .init('templates/modal-sso-auth.html', ssoModalScope)
        .then(function(modal){
          modal.show();
        });
    };



    // Public API here
    return {
      pageAuth: function(pageAccessLevel){
        return pageAccessLevel & currentUser.role;
      },
      isUserExisted: function(username, success, error){
        //Todo
      },
      register: function(registerData, success, error){
        //Todo
      },
      login: function(success, error, close){
        
        signupModalScope.mustChoise = false;
        signupModalScope.onSuccess = function(){
          preRegistModalScope.formData.email = signupModalScope.formData.email;
          preRegistModal();
        };
        signupModalScope.onError = error;
        signupModalScope.onClose = close;
        preRegistModalScope.mustChoise = false;
        allowNotificationModalScope.onOk = function(){
          $state.go('app.game',{gameId: 1});
        }
        preRegistModalScope.onSuccess = function(){
          allowNotificationModal();
        }
        preRegistModalScope.onError = error;
        preRegistModalScope.onClose = close;
        signupModal();
      },
      isLoggedIn: function(){
        return currentUser.role == userRoles.user;
      },
      currentUser: function(){
        return currentUser;
      },
      refreshToken: function(){
        //Todo
      },
      logout:function(success){
        currentUser.userName = '';
        currentUser.role = userRoles.public;
        success();
      },

      ssoAuth: function(ssoData){
        //Todo: 返回授权结果给第三方应用
        var ssoCallBack = function(info){
          if(ionic.Platform.isIOS()){
            console.log("ios loginByClient");
            window.open('gaea00002://?ssoInfo=' + encodeURIComponent(info), '_system');
          }
          if (ionic.Platform.isAndroid()){
            console.log("android loginByClient");
            window.open('gaea00002://?ssoInfo=' + encodeURIComponent(info), '_system');
          }
        };
        var confirmSso = function(){
          //Todo: 如果曾经授权，不需再授权
          ssoAuthModal();
        };

        //请求授权确认按钮
        ssoModalScope.ok = function(){
          ssoCallBack('sso ok');
          ssoModalScope.modal.hide();
        };
        //请求授权取消按钮
        ssoModalScope.cancel = function(){
          ssoCallBack('sso cancel');
          ssoModalScope.modal.hide();
        };
        
        //检验参数是否正确
        // if (!_.isObject(ssoData) || _.keys(_.pick(ssoData, ['appId', 'gameId','callbackHandle'])).length != 3){
        //   ssoCallBack("params error");
        //   return;
        // }
        // if (_.find(gameClients, {appId: ssoData.appId, gameId: ssoData.gameId, callbackHandle:ssoData.callbackHandle}) === undefined){
        //   ssoCallBack("unregistered app client");
        //   return;
        // }
        if (!this.isLoggedIn()){
          signupModalScope.mustChoise = true;
          signupModalScope.onSuccess = function(){
            preRegistModalScope.formData.email = signupModalScope.formData.email;
            preRegistModal();
          };
          signupModalScope.onError = function(){
          };
          signupModalScope.onCancel = function(){
            ssoCallBack('logined cancel');
          };
          preRegistModalScope.mustChoise = true;
          preRegistModalScope.onSuccess = confirmSso;
          preRegistModalScope.onError = function(){
            //登录错误不做任何处理
          };
          preRegistModalScope.onCancel = function(){ 
            ssoCallBack('logined cancel');
          };
          signupModal();
        }else{
          confirmSso();
        }
      },

      accessLevels: accessLevels,
      userRoles: userRoles
    };
  })

.run(['$rootScope', '$state', '$location', '$ionicNavBarDelegate', 'Auth', function ($rootScope, $state, $location, $ionicNavBarDelegate, Auth) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

        console.log(toState.data.access);
        if (!Auth.pageAuth(toState.data.access)) {
          console.log('缺少权限访问' + toState.url);
          Auth.login(function(){
            console.log("登陆获得进入权限");
          },function(){
            //登陆失败
          },function(){
            //关闭登陆窗
            //Todo: 跳转，但不记录本次state
            alert('跳回上一页');
            // $state.go('app.playlists');
          });
        }else{
          console.log('具有权限访问' + toState.url);        
        }
    });

}]);




      // var user = _.find(users, {username: preRegistModalScope.formData.userName});
      //登陆失败
      // if (_.isUndefined(user) || user.password != preRegistModalScope.formData.password){
      // }
      //成功登陆
      // else{
      // }



    //Todo: 实现从服务器验证后，从该处移除
    // var users = [
    //   {
    //     username: 'rui',
    //     password: '123'
    //   },
    //   {
    //     username: 'zakk',
    //     password: '123'
    //   }
    // ];
    // //Todo: 实现从服务器验证后，从该处移除
    // var gameClients = [
    //     {
    //       appId: '1',
    //       gameId: '11111',
    //       platform: 'ios',
    //       callbackHandle: 'gaea00002'
    //     },
    //     {
    //       appId: '2',
    //       gameId: '11111',
    //       platform: 'android',
    //       callbackHandle: 'com.gaeamobile.game'
    //     }
    //   ];