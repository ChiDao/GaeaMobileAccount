
angular.module('services.Auth', ['restangular'])

/**
 * A simple example service that returns some data.
 */
.factory('Auth', function($rootScope, $timeout, $ionicModal, Restangular, Modal) {
    //Todo: 把定义从app.config移到这里
    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , modalData = {};

    //Todo: 从缓存读取用户信息
    var currentUser = { userName: '', role: routingConfig.userRoles.public };

    //定义登陆对话框
    var modalScope = $rootScope.$new();
    modalScope.loginData = {};
    modalScope.doLogin = function(){
      console.log('Doing login:' + JSON.stringify(modalScope.loginData));
      //校验用户名、密码
      //Todo: 访问服务器进行登陆
      // Restangular.allUrl("login", "http://192.168.1.144:3000/api/1.0.0/sessions").post(modalScope.loginData).then(function(data){
      //   console.log('get data:' + JSON.stringify(data));

      // })
      var user = _.find(users, {username: modalScope.loginData.userName});
      //登陆失败
      if (_.isUndefined(user) || user.password != modalScope.loginData.password){
        console.log('login fail')
        _.isFunction(modalScope.onError) && modalScope.onError();
      }
      //成功登陆
      else{
        currentUser.userName = modalScope.loginData.userName,
        currentUser.role = userRoles.user;

        _.isFunction(modalScope.onSuccess) && modalScope.onSuccess();

        //Todo: 保存到缓存
        console.log('login success.');
        $timeout(function() {
          modalScope.closeModal();
        }, 1000);
      }
      
    };
    var loginModal = function(){
      Modal
        .init('templates/login.html', modalScope)
        .then(function(modal){
          modal.show()
        });
    }

    //定义SSO单点登录对话框
    var ssoModalScope = $rootScope.$new();
    var ssoAuthModal = function(){
      Modal
        .init('templates/sso-auth.html', ssoModalScope)
        .then(function(modal){
          modal.show()
        });
    }


    //Todo: 实现从服务器验证后，从该处移除
    var users = [
      {
        username: 'rui',
        password: '123'
      },
      {
        username: 'zakk',
        password: '123'
      }
    ];
    //Todo: 实现从服务器验证后，从该处移除
    var gameClients = [
        {
          gameId: 11111,
          platform: 'ios',
          callbackHandle: ''
        }
      ]

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
        modalScope.mustChoise = false;
        modalScope.onSuccess = success;
        modalScope.onError = error;
        modalScope.onClose = close;
        loginModal();
      },
      isLoggedIn: function(){
        return currentUser.role == userRoles.user
      },
      currentUser: function(){
        return currentUser;
      },
      refreshToken: function(){
        //Todo
      },
      logout:function(success){
        currentUser.userName = '';
        currentUser.role = userRoles.public
        success();
      },

      ssoAuth: function(){
        //Todo: 返回授权结果给第三方应用
        var ssoCallBack = function(info){
          alert("callback, info:" + info);
        }
        var confirmSso = function(){
          ssoAuthModal();
        }

        //请求授权确认按钮
        ssoModalScope.ok = function(){
          ssoCallBack('sso ok')
          ssoModalScope.modal.hide();
        };
        //请求授权取消按钮
        ssoModalScope.cancel = function(){
          ssoCallBack('sso cancel')
          ssoModalScope.modal.hide();
        };
        
        if (!this.isLoggedIn()){
          modalScope.mustChoise = true;
          modalScope.onSuccess = confirmSso;
          modalScope.onError = function(){
            ssoCallBack('logined error');
          };
          modalScope.onCancel = function(){
            ssoCallBack('logined cancel');
          };
          loginModal();
        }else{
          confirmSso()
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
            alert('跳回上一页')
            // $state.go('app.playlists');
          });
        }else{
          console.log('具有权限访问' + toState.url);        
        }
    });

}]);;