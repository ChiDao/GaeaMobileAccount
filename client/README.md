##项目编译

###增加平台，注意ios平台需指定版本，否则url schema的处理不正常

```bash
cordova platforms add ios@3.6.3 android
```

###增加插件，因对安装顺序有要求，暂时停用hook进行安装，使用一下命令行
 
```bash
cordova plugins add org.apache.cordova.file
```

```bash
cordova plugins add org.apache.cordova.file-transfer
```

```bash
cordova plugins add org.chromium.zip
```

```bash
cordova plugins add org.apache.cordova.statusbar
```

```bash
cordova plugins add org.apache.cordova.device
```

```bash
cordova plugins add org.apache.cordova.console
```

```bash
cordova plugins add org.apache.cordova.inappbrowser
```

```bash
cordova plugins add com.ionic.keyboard
```

```bash
cordova plugins add https://github.com/EddyVerbruggen/LaunchMyApp-PhoneGap-Plugin.git --variable URL_SCHEME=GaeaGo
```

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

## icon与splashscreen的设置

```bash
$ sudo npm install cordova-icon -g
$ sudo npm install cordova-splash -g
```
### Requirements

. ImageMagick 
. icon.png / splash.png file must be in the root folder of the project
