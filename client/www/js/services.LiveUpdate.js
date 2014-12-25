
angular.module('services.LiveUpdate', ['restangular'])

.config(function(RestangularProvider) {

    // add a response intereceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
        // console.log(JSON.stringify(data));
      // .. to look for getList operations
      if (operation === "getList") {
        // .. and handle the data and meta data
        extractedData = data.splices;
        //extractedData.meta = data.data.meta;
      } else {
        extractedData = data.data;
      }
      return extractedData;
    });

})

.factory('LiveUpdate', function(Restangular) {

    var installVersion = {
      codeBaseVersion: '1.0.0',
      uiVersion: '1.0.0'
    };

    var downloadFile = function(downloadUrl, fileURL, callback){
      //下载更新文件
      var fileTransfer = new FileTransfer();
      var uri = encodeURI(downloadUrl);

      fileTransfer.download(
          uri,
          fileURL,
          function(entry) {
              console.log("download complete: " + entry.toURL());
              callback(entry);
          },
          function(error) {
              console.log("download error source " + error.source);
              console.log("download error target " + error.target);
              console.log("upload error code" + error.code);
          },
          false,
          {
              headers: {
              }
          }
      );
    };

    return {
      loadIndex: function(){
        console.log(localStorage.getItem('version'));
        //设置版本号
        if (localStorage.getItem('version') === null){
          console.log('init version data');
          localStorage.setItem('version', JSON.stringify({
            codeBaseVersion: installVersion.codeBaseVersion,
            currentUiVersion: installVersion.uiVersion,
            currentUrl: cordova.file.applicationDirectory + "www/index.html"
          }));
        }
        var versionData = JSON.parse(localStorage.getItem('version'));
        console.log('current version:' + versionData.currentUrl);
        //做个保护，处理初始化后马上卸载重新安装路径不一样
        if (versionData.currentUiVersion == installVersion.uiVersion){
          window.location = cordova.file.applicationDirectory + "www/index.html";
        }
        else{
          window.location = versionData.currentUrl;
        }
      },
      update: function () {
      //检查版本
      var versionData = JSON.parse(localStorage.getItem('version'));
      Restangular.allUrl('uiVersions', 'http://192.168.1.111:9001/ui_versions?' + 
        'codeBaseVersion=' + versionData.codeBaseVersion + 
        '&currentUiVersion=' + versionData.currentUiVersion + 
        '&platform=' + ionic.Platform.platform()).getList().then(function(uiUpdates){

          //没有可用更新
          if (uiUpdates.length === 0) return;
          console.log('检查到可用更新');

          //更新localStorage
          var downloadUrl = uiUpdates[0].downloadUrl;
          var parsedUrl = purl(downloadUrl);
          var zipFileURL = cordova.file.dataDirectory + parsedUrl.attr('file');
          var unzipDir = zipFileURL.replace(/\.zip$/, '/');
          versionData.updateUiVersion = uiUpdates[0].version;
          versionData.updateUrl = unzipDir + 'www/index.html';
          localStorage.setItem('version', JSON.stringify(versionData));

          //下载zip文件
          downloadFile(downloadUrl, zipFileURL, function(){

            //解压zip文件
            zip.unzip(zipFileURL, unzipDir, function(){

              //更细localStorage
              versionData.currentUiVersion = versionData.updateUiVersion;
              versionData.currentUrl = versionData.updateUrl;
              localStorage.setItem('version', JSON.stringify(versionData));
            });
          });
        });
      }//End of function update
    };//End of factory return
  });//End of factory