// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope) {
  $scope.loginByClient = function(){
    if(ionic.Platform.isIOS()){
      console.log("ios loginByClient");
      window.open('GaeaGo://?appId=ga14a66eaac9ae6457&url=SoulClash', '_system');
    }
    if (ionic.Platform.isAndroid()){
      console.log("android loginByClient");
      var info = {
        "appId":"11111111",
        "url":"sh.lilith.dgame.DK",
      }
      SetIntent.setIntentCode(function (result) {  
        console.log("Result: " + result);  
      },function (err) {  
        console.log("Failure: " + err);  
      },"com.gaeagame.go",info);
      // window.open('GaeaGo://?appId=ga14a66eaac9ae6457&url=SoulClash', '_system');
    }
  }

  $scope.getLoginData = function(url){
      var parsedUrl = purl(url);  
      var loginData = parsedUrl.param();
      setTimeout(function(){
        alert(JSON.stringify(loginData));
      }, 100);
  }
  $scope.getLoginDataAd = function(info){
      setTimeout(function(){
        alert(info);
      }, 100);
  }
});


function getIntentExtras(info) {
  var body = document.getElementsByTagName("body")[0];
  var mainController = angular.element(body).scope();
  mainController.getLoginDataAd(info);
}

function getIntentFailure(err) {
  console.log("err: " + err);
}

function handleOpenURL(url) {
    var body = document.getElementsByTagName("body")[0];
    var mainController = angular.element(body).scope();
    mainController.getLoginData(url);
};
