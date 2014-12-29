#!/usr/bin/env node
 
//this hook installs all your plugins
 
// add your plugins to this list--either 
// the identifier, the filesystem location 
// or the URL
var pluginlist = [
    // "org.apache.cordova.device",
    // "org.apache.cordova.console",
    // "org.apache.cordova.inappbrowser",
    // "com.ionic.keyboard",
    // "https://github.com/EddyVerbruggen/LaunchMyApp-PhoneGap-Plugin.git --variable URL_SCHEME=gaea00001",
    // "technology.kulak.cordova.appopen",
    // "https://github.com/ohh2ahh/AppAvailability.git",
    // "org.apache.cordova.file",
    // "org.apache.cordova.file-transfer",
    // "org.chromium.zip",
    "https://github.com/phonegap-build/PushPlugin.git"
];

// no need to configure below
 
var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;
 
function puts(error, stdout, stderr) {
    sys.puts(stdout)
}
 
pluginlist.forEach(function(plug) {
    exec("cordova plugins add " + plug, puts);
});

//exec("cordova plugins add ", puts);
