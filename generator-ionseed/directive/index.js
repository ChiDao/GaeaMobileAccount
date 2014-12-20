var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing: function () {
    console.log('initializing');
  },
  prompting: {
    directiveName: function () {
      var done = this.async();
      this.prompt({
        type    : 'input',
        name    : 'directiveName',
        message : 'Directive名称：',
        default : 'newDirective' // Default to current folder name
      }, function (answers) {
        this.directiveName = this._.camelize(this._.slugify(this._.humanize(answers.directiveName)));
        done();
      }.bind(this));
    },
    needHtml: function(){
      var done = this.async();
      this.prompt({
        type    : 'confirm',
        name    : 'needHtml',
        message : '是否需要外部Html文件：',
        default : true // Default to current folder name
      }, function (answers) {
        this.needHtml = answers.needHtml;
        done();
      }.bind(this));
    }
  },
  configuring: function () {
  },
  writing: function(){
    if (this.needHtml){
      this.template(
        '_eDirective.js',
        'www/js/directives.' + this.directiveName + '.js', 
        {
          angularApp: this.config.get('angularApp'),
          directiveName: this.directiveName
        }
      );
      this.copy(
        'eDirective.css',
        'www/js/directives.' + this.directiveName + '.css'
        );
      this.template(
        '_eDirective.html',
        'www/js/directives.' + this.directiveName + '.html', 
        {
          angularApp: this.config.get('angularApp'),
          directiveName: this.directiveName
        }
      );
    }
    else{
      this.template(
        '_directive.js',
        'www/js/directives.' + this.directiveName + '.js', 
        {
          angularApp: this.config.get('angularApp'),
          directiveName: this.directiveName
        }
      );
    }
    console.log('复制Directive文件。');
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
