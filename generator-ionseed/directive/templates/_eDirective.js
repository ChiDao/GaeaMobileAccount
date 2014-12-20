'use strict';

angular.module('<%= angularApp %>')
  .directive('<%= directiveName %>', function () {
    return {
      templateUrl: 'www/js/directives.<%= directiveName %>.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });