#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
 
var rootdir = process.argv[2];
 
function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
 
    var result = data.replace(new RegExp(to_replace, "g"), replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}
 
if (rootdir) {

    var pushforios = [
        {
            file:"platforms/ios/GoYa\!/Plugins/com.phonegap.plugins.PushPlugin/PushPlugin.m",
            to_replace:'registerForRemoteNotificationTypes:notificationTypes',
            replace_with:'registerForRemoteNotificationTypes:(UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound)'
        }
    ];
    pushforios.forEach(function(val, index, array) {
        var fullfilename = path.join(rootdir, val.file);
        if (fs.existsSync(fullfilename)) {           
            replace_string_in_file(fullfilename, 
                val.to_replace, 
                val.replace_with);
        } else {
            console.log("missing: "+fullfilename);
        }
    });
 
}
