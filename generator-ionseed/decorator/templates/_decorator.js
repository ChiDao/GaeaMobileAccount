'use strict';

angular.module('<%= angularApp %>')
  .config(function ($provide) {
    $provide.decorator('<%= decoratorName %>', function ($delegate) {
      // decorate the $delegate
      return $delegate;
    });
  });