define(['app'], function(app)
{
  app.factory('UI', function() {

    return {
      openURL: function(URL){
        window.open(URL, '_system');
      }

    }

  });
});
