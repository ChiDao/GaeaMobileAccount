'use strict';

angular.module('<%= angularApp %>')
  .filter('<%= filterName %>', function () {
    return function (input) {
      return '<%= filterName %> filter: ' + input;
    };
  });
