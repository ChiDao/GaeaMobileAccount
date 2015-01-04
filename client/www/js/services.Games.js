define(['app'], function(app)
{
  app.factory('Games', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var games = [
      { id: 0, name: 'Object 1', icon: 'img/ionic.png' },
      { id: 1, name: 'Object 2', icon: 'img/ionic.png' },
      { id: 2, name: 'Object 3', icon: 'img/ionic.png' },
      { id: 3, name: 'Object 4', icon: 'img/ionic.png' }
    ];

    return {
      all: function() {
        return games;
      },
      get: function(gameId) {
        // Simple index lookup
        return games[gameId];
      }
    }
  });
});
