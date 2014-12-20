angular.module('services.<%= serviceName %>', [])

/**
 * A simple example service that returns some data.
 */
.factory('<%= serviceName %>', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var <%= objectsName %> = [
    { id: 0, name: 'Object 1', icon: 'img/ionic.png' },
    { id: 1, name: 'Object 2', icon: 'img/ionic.png' },
    { id: 2, name: 'Object 3', icon: 'img/ionic.png' },
    { id: 3, name: 'Object 4', icon: 'img/ionic.png' }
  ];

  return {
    all: function() {
      return <%= objectsName %>;
    },
    get: function(<%= objectName %>Id) {
      // Simple index lookup
      return <%= objectsName %>[<%= objectName %>Id];
    }
  }
});
