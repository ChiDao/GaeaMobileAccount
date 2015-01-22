(function () {
	var cordova = require('cordova');  
	var GetIntent = function() {};
	var getIntent = new GetIntent();
	module.exports = getIntent;

  function triggerOpenURL() {
    cordova.exec(
        getIntentExtras,
        getIntentFailure,
        "LaunchMyApp",
        "checkIntent",
        []);
  }

  document.addEventListener("deviceready", triggerOpenURL, false);
}());