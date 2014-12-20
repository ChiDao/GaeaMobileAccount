var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing: function () {
    console.log('initializing');
  },
  prompting: {
    controllerName: function () {
      var done = this.async();
      this.prompt({
        type    : 'input',
        name    : 'controllerName',
        message : 'Controller名称：',
        default : 'newController' // Default to current folder name
      }, function (answers) {
        this.controllerName = this._.camelize(this._.slugify(this._.humanize(answers.controllerName)));
        this.fileName = 'controllers.' + this.controllerName + 'Ctrl.js';
        done();
      }.bind(this));
    }
  },
  configuring: function () {
  },
  writing: function(){
    this.template(
      '_controller.js',
      'www/js/' + this.fileName, 
      {
        angularApp: this.config.get('angularApp'),
        controllerName: this.controllerName
      });
    console.log('复制Controller文件。');
  },
  conflicts: function () {
    console.log('conflicts');
  },
  install: function () {
    console.log('install');
  },
  end: function () {
    console.log('end');
  },
  default: {
    method1: function () {
      console.log('method 1 just ran');
    },
    method2: function () {
      console.log('method 2 just ran');
    }
  }

});
