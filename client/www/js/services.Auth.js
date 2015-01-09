define(['app', 'services.Modal', 'services.Push'], function(app)
{
    app.factory('Auth', function($rootScope, $ionicHistory, $timeout, $state, 
      $http, $ionicModal, Restangular, Modal,PushProcessingService) {
      //Todo: 把定义从app.config移到这里
      var accessLevels = app.routingConfig.accessLevels,
          userRoles = app.routingConfig.userRoles,
          modalData = {};

      //Todo: 从缓存读取用户信息
      var userData = (localStorage.getItem('user') === null?{a:1}:JSON.parse(localStorage.getItem('user')));
      console.log(userData);
      var currentUser = (localStorage.getItem('user') === null?
                         { userName: '', role: app.routingConfig.userRoles.public, userData: {} }:
                         { userName: userData.email, role:app.routingConfig.userRoles.user, userData: userData}
                         )
      // var currentUser = { userName: '', role: routingConfig.userRoles.public, userData: {} }

      //定义输入邮箱对话框
      var signupModalScope = $rootScope.$new();
      signupModalScope.formData = {email:''};
      signupModalScope.commitForm = function(commitForm){
        if (commitForm.$invalid) return;
        console.log(signupModalScope.formData.email.$in);
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
        if (signupModalScope.modal){
          signupModalScope.modal.remove();
        }
        Modal
          .init('templates/modal-signup.html', signupModalScope)
          .then(function(modal){
            modal.show();
          });
      };

      //定义登陆对话框
      var preRegistModalScope = $rootScope.$new();
      preRegistModalScope.formData = {password: ''};
      preRegistModalScope.resetcommitFormError = function(ev){
          preRegistModalScope.commitFormError = false;
      }
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
            localStorage.setItem('user', JSON.stringify(me.data.rawData));
            console.log(me.data.rawData);
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
        if (preRegistModal.modal){
          preRegistModal.modal.remove();
        }
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
        if (ssoAuthModal.modal){
          ssoAuthModal.modal.remove();
        }
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
          // preRegistModal();
          // allowNotificationModal();
          signupModalScope.mustChoise = false;
          signupModalScope.onSuccess = function(){
            preRegistModalScope.formData.email = signupModalScope.formData.email;
            preRegistModal();
          };
          signupModalScope.onError = error;
          signupModalScope.onClose = close;
          preRegistModalScope.mustChoise = false;
          allowNotificationModalScope.onOk = function(){
           PushProcessingService.initialize();
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });
            $state.go('app.wait-open');
          }
          preRegistModalScope.onSuccess = function(){
            var checkPush =  PushProcessingService.checkResult();
                console.log("checkPush"+checkPush);
                if(checkPush != "Yes"){
                  allowNotificationModal();
                }else{
                  $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                  });
                  $state.go('app.wait-open');
                }
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
            signupModalScope.onSuccess = undefined;
            signupModalScope.onError = undefined;
            signupModalScope.onCancel = undefined;
            preRegistModalScope.onSuccess = undefined;
            preRegistModalScope.onError = undefined;
            preRegistModalScope.onError = undefined;
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
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });
            $state.go('app.wait-open');
            Restangular.oneUrl('user-client-authorize/' + ssoData.appId + '/' + ssoData.url).get().then(function(data){
              console.log('Get client authorize Success, Get data:' + JSON.stringify(data));
              ssoModalScope.gameClientTitle = data.data.rawData.description;
              ssoModalScope.authCode = data.data.rawData.code;
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
          
          
          if (!this.isLoggedIn()){
            signupModalScope.mustChoise = true;
            signupModalScope.onSuccess = function(){
              preRegistModalScope.formData.email = signupModalScope.formData.email;
              preRegistModalScope.commitFormError = false;
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
});

