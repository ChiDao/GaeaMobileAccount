
angular.module('services.Auth', ['restangular'])

/**
 * A simple example service that returns some data.
 */
.factory('Auth', function($rootScope, $timeout, $state, $http, $ionicModal, Restangular, Modal) {
    //Todo: 把定义从app.config移到这里
    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles,
        modalData = {};

    //Todo: 从缓存读取用户信息
    var userData = (localStorage.getItem('user') === null?{a:1}:JSON.parse(localStorage.getItem('user')));
    console.log(userData);
    var currentUser = (localStorage.getItem('user') === null?
                       { userName: '', role: routingConfig.userRoles.public, userData: {} }:
                       { userName: userData.email, role:routingConfig.userRoles.user, userData: userData}
                       )
    // var currentUser = { userName: '', role: routingConfig.userRoles.public, userData: {} }

    //定义输入邮箱对话框
    var signupModalScope = $rootScope.$new();
    signupModalScope.formData = {email:''};
    signupModalScope.commitForm = function(commitForm){
      if (commitForm.$invalid) return;
      // console.log(signupModalScope.formData.email.$in);
      console.log('Doing signUp:' + JSON.stringify(signupModalScope.formData));
      // var Signup = Restangular.all('signup');
      // Signup.post(signupModalScope.formData).then(function(data){
      // console.log('Signup success, get data:' + JSON.stringify(data));
        signupModalScope.modal.hide();
        if (_.isFunction(signupModalScope.onSuccess)) signupModalScope.onSuccess();
      // }, function(error){
      //   console.log('Signup error, get data:' + JSON.stringify(error));
      //   if (_.isFunction(signupModalScope.onError)) signupModalScope.onError();
      // })
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
    preRegistModalScope.formData = {password: ''};
    preRegistModalScope.commitForm = function(commitForm){
      if (commitForm.$invalid) return;
      preRegistModalScope.commitFormError = false;

      console.log('Doing login:' + JSON.stringify(preRegistModalScope.formData));
      //校验用户名、密码
      //Todo: 访问服务器进行登陆
      var PreRegist = Restangular.all("pre-register");
      PreRegist.post(preRegistModalScope.formData).then(function(data){
        console.log('login success.get data:' + JSON.stringify(data));
        //Todo: 请求用户信息
        var Me = Restangular.one("me");
        Me.get().then(function(me){
          console.log(me);
          currentUser.userName = preRegistModalScope.formData.email;
          currentUser.role = userRoles.user;
          //存储用户信息到localStorage
          localStorage.setItem('user', JSON.stringify(me.rawData));
          console.log(me.rawData);
          if (_.isFunction(preRegistModalScope.onSuccess)) preRegistModalScope.onSuccess();
          $timeout(function() {
            preRegistModalScope.closeModal();
          }, 1000);
        },function(error){
          preRegistModalScope.commitFormError = true;
          preRegistModalScope.commitFormErrorMsg = error.data.alertMsg;
          console.log('login fail, get data: ' + JSON.stringify(error));
        })
      }, function(error){
        preRegistModalScope.commitFormError = true;
        preRegistModalScope.commitFormErrorMsg = error.data.alertMsg;
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
    allowNotificationModalScope.cancel = function(){
      allowNotificationModalScope.modal.hide();
      if (_.isFunction(allowNotificationModalScope.onCancel)) allowNotificationModalScope.onCancel();
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
    ssoModalScope.ok = function(){
      ssoModalScope.modal.hide();
      if (_.isFunction(ssoModalScope.onOk)) ssoModalScope.onOk();
    }
    ssoModalScope.cancel = function(){
      ssoModalScope.modal.hide();
      if (_.isFunction(ssoModalScope.onCancel)) ssoModalScope.onCancel();
    }
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
        localStorage.removeItem('user', null);
        success();
      },

      ssoAuth: function(ssoData){
        //Todo: 返回授权结果给第三方应用
        var ssoCallBack = function(status, info){
          if (ionic.Platform.platform() === 'macintel'){
            console.log(ssoData.url + '://?status=' + status + '&info=' + encodeURIComponent(info) + (status==='0'?'&code=' + ssoModalScope.authCode:''));
          }
          if(ionic.Platform.isIOS()){
            console.log("ios loginByClient");
            window.open(ssoData.url + '://?status=' + status + '&info=' + encodeURIComponent(info) + (status==='0'?'&code=' + ssoModalScope.authCode:''), '_system');
          }
          if (ionic.Platform.isAndroid()){
            console.log("android loginByClient");
            window.open(ssoData.url + '://?status=' + status + '&info=' + encodeURIComponent(info) + (status==='0'?'&code=' + ssoModalScope.authCode:''), '_system');
          }
        };
        var confirmSso = function(){
          Restangular.oneUrl('user-client-authorize/' + ssoData.appId + '/' + ssoData.url).get().then(function(data){
            console.log('Get client authorize Success, Get data:' + JSON.stringify(data));
            ssoModalScope.gameClientTitle = data.rawData.description;
            ssoModalScope.authCode = data.rawData.code;
            ssoAuthModal();
          }, function(error){
            ssoCallBack('-3', 'sso fail');
            console.log('Get client authorize Error:' + JSON.stringify(error));
          })
          //Todo: 如果曾经授权，不需再授权
        };

        //请求授权确认按钮
        ssoModalScope.onOk = function(){
          ssoCallBack('0', 'sso ok');
        };
        //请求授权取消按钮
        ssoModalScope.onCancel = function(){
          ssoCallBack('-2', 'sso cancel');
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
            ssoCallBack('-1', 'logined cancel');
          };
          preRegistModalScope.mustChoise = true;
          preRegistModalScope.onSuccess = confirmSso;
          preRegistModalScope.onError = function(){
            //登录错误不做任何处理
          };
          preRegistModalScope.onCancel = function(){ 
            ssoCallBack('-1', 'logined cancel');
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


      // 使用测试跨域
      // $http({method:'POST',
      //        url:'http://42.120.45.236:8485/pre-register',
      //        data:{email: '18675629290@163.com', password: '3226'},
      //        withCredentials: true,
      //        headers:   {
      //                    'Content-Type': 'application/json',
      //                    'X-Requested-With': 'XMLHttpRequest'
      //       }
      //    }).success(function(data, status, headers, config){

      //     console.log(data);
      //     console.log(headers())

      //     $http({method:    'GET',
      //            url:       'http://42.120.45.236:8485/user-client-authorize/ga14a66eaac9ae6457/wb1121741102',
      //            withCredentials: true,
      //            headers:   {
      //                       'Content-Type': 'application/json',
      //                       'X-Requested-With': 'XMLHttpRequest'
      //                       }
      //         }).success(function(data){

      //         console.log(data);
              

      //         })
      //         .error(function(data, status, headers, config) {
      //           console.log(headers())
      //           // called asynchronously if an error occurs
      //           // or server returns response with an error status.
      //         });;
      // })
