'use strict';

angular.module('<%= angularApp %>')
  .directive('<%= directiveName %>', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the <%= directiveName %> directive');
      }
    };
  });