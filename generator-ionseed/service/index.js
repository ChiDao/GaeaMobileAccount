var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing: function () {
    console.log('initializing');
  },
  prompting: {
    serviceName: function () {
      var done = this.async();
      this.prompt({
        type    : 'input',
        name    : 'serviceName',
        message : 'Service名称：',
        default : 'newService' // Default to current folder name
      }, function (answers) {
        this.serviceName = this._.camelize(this._.slugify(this._.humanize(answers.serviceName))); 
        this.fileName = 'services.' + this.serviceName + '.js';
        done();
      }.bind(this));
    }
  },
  configuring: function () {
  },
  writing: function(){
    this.template(
      '_service.js',
      'www/js/' + this.fileName, 
      {
        angularApp: this.config.get('angularApp'),
        serviceName: this.serviceName
      });
    console.log('复制Service文件。');
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
