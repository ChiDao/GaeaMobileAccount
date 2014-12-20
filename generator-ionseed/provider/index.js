var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing: function () {
    console.log('initializing');
  },
  prompting: {
    providerName: function () {
      var done = this.async();
      this.prompt({
        type    : 'input',
        name    : 'providerName',
        message : 'Provider名称：',
        default : 'newProvider' // Default to current folder name
      }, function (answers) {
        this.providerName = this._.camelize(this._.slugify(this._.humanize(answers.providerName))); 
        this.fileName = 'services.' + this.providerName + '.js';
        done();
      }.bind(this));
    }
  },
  configuring: function () {
  },
  writing: function(){
    this.template(
      '_provider.js',
      'www/js/' + this.fileName, 
      {
        angularApp: this.config.get('angularApp'),
        providerName: this.providerName
      });
    console.log('复制Provider文件。');
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
