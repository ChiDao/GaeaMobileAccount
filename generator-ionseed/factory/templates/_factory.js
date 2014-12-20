'use strict';

angular.module('<%= angularApp %>')
  .factory('<%= factoryName %>', function () {
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
