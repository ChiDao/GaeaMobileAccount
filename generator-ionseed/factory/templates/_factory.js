
angular.module('services.<%= factoryName %>', [])

/**
 * A simple example service that returns some data.
 */
.factory('<%= factoryName %>', function() {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });