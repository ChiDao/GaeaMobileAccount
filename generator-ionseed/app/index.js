var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
    console.log('initializing');
  },
  prompting: {
    projectName: function () {
    	var done = this.async();
    	this.prompt({
    		type    : 'input',
    		name    : 'projectName',
    		message : '项目名称：',
        default : this.appname // Default to current folder name
  	  }, function (answers) {
        this.projectName = this._.camelize(this._.slugify(this._.humanize(answers.projectName))); 
        done();
  	  }.bind(this));
    },

    Name: function () {
      var done = this.async();
      this.prompt({
        type    : 'input',
        name    : 'appId',
        message : '应用ID（Android包名，iOS CFBundle）：',
        default : 'com.gaeamobile.' + this.projectName.toLowerCase() // Default to current folder name
      }, function (answers) {
        this.appId = this._.humanize(answers.appId).replace(/\s/, '.').toLowerCase();
        done();
      }.bind(this));
    }
  },
  configuring: function () {
  },
  writing: function(){
    this.directory('ionic/beta13/project_template/tabs/www','www');
    this.template(
      'ionic/beta13/project_template/tabs/_config.xml',
      'config.xml', {
        projectName: this.projectName,
        appId: this.appId
      });
    console.log('复制项目文件。');
    this.directory('ionic/beta13/lib','www/lib/ionic');
    console.log('复制Ionic文件。');
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
