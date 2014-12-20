var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing: function () {
    console.log('initializing');
  },
  prompting: {
    decoratorName: function () {
      var done = this.async();
      this.prompt({
        type    : 'input',
        name    : 'decoratorName',
        message : 'Decorator名称：',
        default : 'newDecorator' // Default to current folder name
      }, function (answers) {
        this.decoratorName = this._.camelize(this._.slugify(this._.humanize(answers.decoratorName)));
        this.fileName = 'services.' + this.decoratorName + '.js';
        done();
      }.bind(this));
    }
  },
  configuring: function () {
  },
  writing: function(){
    this.template(
      '_decorator.js',
      'www/js/' + this.fileName, 
      {
        angularApp: this.config.get('angularApp'),
        decoratorName: this.decoratorName
      });
    console.log('复制Decorator文件。');
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
