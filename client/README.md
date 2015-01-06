#前提条件

```bash
install cordova-icon -g
install cordova-splash -g
brew install ImageMagick
npm install
```


##项目编译

###增加平台，注意ios平台需指定版本，否则url schema的处理不正常

```bash
cordova platforms add ios@3.6.3 android
```

###打开项目并运行

####ios，用xcode打开项目并编译执行

```bash
xed platforms/ios/client.xcodeproj/
```

####android，用ADT打开项目并编译执行

##页面开发

###打开gulp watch，自动转换jade,scss
 
 ```bash
 gulp watch
 ```
 
###打开ionic reload

```bash
ionic serve
```

如果页面没有正常显示，设置config.xml中\<content src="index.html"/>

###文件路径：
 1. jade文件路径：www_pre/jade
 2. scss文件路径：www_pre/scss
 
###预注册流程文件
 1. 开始页面: start.jade
 2. step1: modal-signup.jade
 3. step2: modal-login.jade
 4. step3: modal-allow-notification.jade
 5. 游戏页面: game.jade

