var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing: function () {
    console.log('initializing');
  },
  prompting: {
    filterName: function () {
      var done = this.async();
      this.prompt({
        type    : 'input',
        name    : 'filterName',
        message : 'Filter名称：',
        default : 'newFilter' // Default to current folder name
      }, function (answers) {
        this.filterName = this._.camelize(this._.slugify(this._.humanize(answers.filterName))); 
        this.fileName = 'filters.' + this.filterName + '.js';
        done();
      }.bind(this));
    }
  },
  configuring: function () {
  },
  writing: function(){
    this.template(
      '_filter.js',
      'www/js/' + this.fileName, 
      {
        angularApp: this.config.get('angularApp'),
        filterName: this.filterName
      });
    console.log('复制Filter文件。');
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
