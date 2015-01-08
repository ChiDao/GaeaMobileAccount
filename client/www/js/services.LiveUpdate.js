define(['app', 'restangular'], function(app)
{
  app.factory('LiveUpdate', function(Restangular) {

    var installVersion = {
      codeBaseVersion: '1.0.0',
      uiVersion: '1.0.0'
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
        console.log('Check update');
        var versionData = JSON.parse(localStorage.getItem('version'));
        return Thenjs(function(defer){
          Restangular.oneUrl('ui-update-pack/' + versionData.codeBaseVersion 
            + '/' + versionData.currentUiVersion + '/' + ionic.Platform.platform()
            ).get().then(function(uiUpdates){
              //没有可用更新
              console.log('检查到可用更新' + JSON.stringify(uiUpdates));

              //更新localStorage
              var downloadUrl = uiUpdates.data.rawData.downloadUrl;
              var parsedUrl = purl(downloadUrl);
              var zipFileURL = cordova.file.dataDirectory + parsedUrl.attr('file');
              var unzipDir = zipFileURL.replace(/\.zip$/, '/');
              versionData.updateUiVersion = uiUpdates.data.rawData.updateUiVersion;
              versionData.updateUrl = unzipDir + 'www/index.html';
              localStorage.setItem('version', JSON.stringify(versionData));

              //下载更新文件
              (function(downloadUrl, fileURL, callback){
                var fileTransfer = new FileTransfer();
                var uri = encodeURI(downloadUrl);

                fileTransfer.download(
                    uri,
                    fileURL,
                    function(entry) {
                        console.log("download complete: " + entry.toURL());
                        callback();
                    },
                    function(error) {
                        console.log("download error source " + error.source);
                        console.log("download error target " + error.target);
                        console.log("upload error code" + error.code);
                        defer('Download UI update packs Error.');
                    },
                    false,
                    {
                        headers: {
                        }
                    }
                );
              })(downloadUrl, zipFileURL, function(){
                //解压文件
                zip.unzip(zipFileURL, unzipDir, function(error){
                  if (error !== 0){
                    defer('Unzip UI update packs error');
                  }else{
                    //更细localStorage
                    versionData.currentUiVersion = versionData.updateUiVersion;
                    versionData.currentUrl = versionData.updateUrl;
                    localStorage.setItem('version', JSON.stringify(versionData));
                    defer(undefined);
                  }
                });
              });

            },function(error){
              console.log(JSON.stringify(error));
              defer(JSON.stringify(error))
            });
          });
      }//End of function update
    };//End of factory return
  });//End of factory
});