var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing: function () {
    console.log('initializing');
  },
  prompting: {
    factoryName: function () {
      var done = this.async();
      this.prompt({
        type    : 'input',
        name    : 'factoryName',
        message : 'Factory名称：',
        default : 'newFactory' // Default to current folder name
      }, function (answers) {
        this.factoryName = this._.camelize(this._.slugify(this._.humanize(answers.factoryName)));
        this.fileName = 'services.' + this.factoryName + '.js';
        done();
      }.bind(this));
    }
  },
  configuring: function () {
  },
  writing: function(){
    this.template(
      '_factory.js',
      'www/js/' + this.fileName, 
      {
        angularApp: this.config.get('angularApp'),
        factoryName: this.factoryName
      });
    console.log('复制Factory文件。');
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
