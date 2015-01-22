var cordova = require('cordova');  
var SetIntent = function() {};

SetIntent.prototype.setIntentCode = function(success, error,packagename,json) {  
    cordova.exec(success, error, 'SetIntentPlugin', 'setIntentCode', [packagename,json]);  
};  

var setIntent = new SetIntent();
module.exports = setIntent;
