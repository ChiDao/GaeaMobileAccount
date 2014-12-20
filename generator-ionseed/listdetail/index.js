var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var plural = require('plural');

var addBeforeInFile = function(filePath, regExp, to, checkString){
    var fileData = fs.readFileSync(filePath,  'utf8'); 
    if (!_.include(fileData, checkString)){
      fs.outputFileSync(filePath, fileData.replace(regExp, to));
    }
};

module.exports = yeoman.Base.extend({
  initializing: function () {
    console.log('initializing');
  },
  prompting: {
    objectName: function () {
      var done = this.async();
      this.prompt(
      {
        type    : 'input',
        name    : 'objectName',
        message : '处理对象名称（单数）：',
        default : 'object' // Default to current folder name
      }, function (answers) {
        this.objectName = this._.camelize(this._.slugify(this._.humanize(answers.objectName))); 
        this.objectNameDasherize = this._.dasherize(this.objectName);
        this.objectNameUnderscored = this._.underscored(this.objectName);
        this.objectsName = this._.camelize(this._.slugify(plural(this._.humanize(answers.objectName), 2))); 
        this.objectsNameDasherize = this._.dasherize(this.objectsName);
        this.objectsNameUnderscored = this._.underscored(this.objectsName);
        this.objectControllerName = this.objectName.replace(/^(\w)/, function(m){return m.toUpperCase();}) + 'Ctrl';   
        this.objectsControllerName = this.objectsName.replace(/^(\w)/, function(m){return m.toUpperCase();}) + 'Ctrl';  
        done();
      }.bind(this));
    },
    objectsTitle: function () {
      var done = this.async();
      this.prompt(
      {
        type    : 'input',
        name    : 'objectsTitle',
        message : '列表页标题：',
        default : this._.titleize(this._.humanize(this.objectsName)) // Default to current folder name
      }, function (answers) {
        this.objectsTitle = answers.objectsTitle;
        done();
      }.bind(this));
    },
    objectsTemplate: function () {
      var done = this.async();
      this.prompt(
      {
        type    : 'rawlist',
        choices : ['图标＋名称', '只有名称'],
        name    : 'objectsTemplate',
        message : '列表页模版：',
        default : 0 // Default to current folder name
      }, function (answers) {
        this.objectsTemplate = answers.objectsTemplate;
        console.log(this.objectsTemplate);
        done();
      }.bind(this));
    },
    objectsNeedCss: function(){
      var done = this.async();
      this.prompt({
        type    : 'confirm',
        name    : 'objectsNeedCss',
        message : '列表页是否需要单独Css文件：',
        default : false // Default to current folder name
      }, function (answers) {
        this.objectsNeedCss = answers.objectsNeedCss;
        done();
      }.bind(this));
    },
    objectsStateUrl: function () {
      var done = this.async();
      this.prompt(
      {
        type    : 'input',
        name    : 'objectsStateUrl',
        message : '列表页State Url：',
        default : this.objectsNameUnderscored // Default to current folder name
      }, function (answers) {
        this.objectsStateUrl = this._.underscored(this._.slugify(this._.humanize(answers.objectsStateUrl)));  
        done();
      }.bind(this));
    },
    objectNeedCss: function(){
      var done = this.async();
      this.prompt({
        type    : 'confirm',
        name    : 'objectNeedCss',
        message : '详情页是否需要单独Css文件：',
        default : false // Default to current folder name
      }, function (answers) {
        this.objectNeedCss = answers.objectNeedCss;
        done();
      }.bind(this));
    },
    objectStateUrl: function () {
      var done = this.async();
      this.prompt(
      {
        type    : 'input',
        name    : 'objectStateUrl',
        message : '详情页State Url：',
        default : this.objectsNameUnderscored // Default to current folder name
      }, function (answers) {
        this.objectStateUrl = this._.underscored(this._.slugify(this._.humanize(answers.objectStateUrl)));  
        done();
      }.bind(this));
    },
    serviceName: function () {
      var done = this.async();
      this.prompt(
      {
        type    : 'input',
        name    : 'serviceName',
        message : 'Service名称：',
        default : this.objectsName.replace(/^(\w)/, function(m){return m.toUpperCase();}) // Default to current folder name
      }, function (answers) {
        this.serviceName = this._.camelize(this._.slugify(this._.humanize(answers.serviceName))).replace(/^(\w)/, function(m){return m.toUpperCase();});  
        done();
      }.bind(this));
    },
  },
  configuring: function () {
  },
  writing: function(){
  	if (this.objectsTemplate === '图标＋名称'){
	    this.template(
	      '_list_icon.html',
	      'www/templates/' + this.objectsNameDasherize  + '.html', 
	      {
	        objectsTitle: this.objectsTitle,
	        objectsName: this.objectsName,
	        objectName: this.objectName,
	        objectStateUrl: this.objectStateUrl
	      });
  	}
  	else if(this.objectsTemplate === '只有名称'){
	    this.template(
	      '_list.html',
	      'www/templates/' + this.objectsNameDasherize  + '.html', 
	      {
	        objectsTitle: this.objectsTitle,
	        objectsName: this.objectsName,
	        objectName: this.objectName,
	        objectStateUrl: this.objectStateUrl
	      });
  	}
    this.template(
      '_detail.html',
      'www/templates/' + this.objectNameDasherize  + '.html', 
      {
        objectsName: this.objectsName,
        objectName: this.objectName
      });

    this.template(
      '_list.controller.js',
      'www/js/controllers.' + this.objectsControllerName + '.js', 
      {
        objectsControllerName: this.objectsControllerName,
        objectsName: this.objectsName,
        serviceName: this.serviceName
      });
    this.template(
      '_detail.controller.js',
      'www/js/controllers.' + this.objectControllerName + '.js', 
      {
        objectControllerName: this.objectControllerName,
        objectsName: this.objectsName,
        objectName: this.objectName,
        serviceName: this.serviceName
      });
    this.template(
      '_object.service.js',
      'www/js/services.' + this.serviceName + '.js', 
      {
        objectsName: this.objectsName,
        objectName: this.objectName,
        serviceName: this.serviceName
      });
    console.log('复制列表和详情文件。');

    if (this.objectsNeedCss){
    	this.copy('list.css', 'www/css/' + this.objectsName + '.css')
    }
    if (this.objectNeedCss){
    	this.copy('detail.css', 'www/css/' + this.objectName + '.css')
    }
  },
  conflicts: function () {
    console.log('conflicts');
  },
  install: {
  	modifileFile: function () {
	    //修改controllers.js文件
	    var destinationRoot = process.cwd();
	    addBeforeInFile(
	      destinationRoot + '/www/js/controllers.js',
	      /(angular.module\(\s*\'starter\.controllers\'\s*,\s*\[)/,
	      '$1\'controllers.'+ this.objectControllerName + '\', ',
	      'controllers.'+ this.objectControllerName
	    )
	    addBeforeInFile(
	      destinationRoot + '/www/js/controllers.js',
	      /(angular.module\(\s*\'starter\.controllers\'\s*,\s*\[)/,
	      '$1\'controllers.'+ this.objectsControllerName + '\', ',
	      'controllers.'+ this.objectsControllerName
	    )
	    console.log('更改www/js/controllers.js文件');

	    //修改services.js文件
	    addBeforeInFile(
	      destinationRoot + '/www/js/services.js',
	      /(angular.module\(\s*\'starter\.services\'\s*,\s*\[)/,
	      '$1\'services.'+ this.serviceName + '\', ',
	      'services.'+ this.serviceName
	    )
	    console.log('更改www/js/services.js文件');

	    //修改index.html文件
	    addBeforeInFile(
	      destinationRoot + '/www/js/app.js',
	      /(stateProviderPlaceHolder)/,
	      "$1\n\n" +
	      "      .state('app." + this.objectNameDasherize + "', {\n" +
	      "      url: '/" + this.objectsStateUrl + "/:" + this.objectName + "Id' ,\n" +
	      "      views: {\n" +
	      "        'menuContent': {\n" +
	      "          templateUrl: 'templates/" + this.objectNameDasherize  + ".html',\n" +
	      "          controller: '" + this.objectControllerName + "'\n" +
	      "        }\n" +
	      "      }\n" +
	      "    })\n",
	      this.objectControllerName
	    );
	    addBeforeInFile(
	      destinationRoot + '/www/js/app.js',
	      /(stateProviderPlaceHolder)/,
	      "$1\n\n" +
	      "      .state('app." + this.objectsNameDasherize + "', {\n" +
	      "      url: '/" + this.objectsStateUrl + "',\n" +
	      "      views: {\n" +
	      "        'menuContent': {\n" +
	      "          templateUrl: 'templates/" + this.objectsNameDasherize  + ".html',\n" +
	      "          controller: '" + this.objectsControllerName + "'\n" +
	      "        }\n" +
	      "      }\n" +
	      "    })\n",
	      this.objectsControllerName
	    );
	    console.log('更改www/js/app.js文件');

	    //修改index.html文件
	    addBeforeInFile(
	      destinationRoot + '/www/index.html',
	      /(<script src=\"js\/controllers.js"><\/script>)/,
	      "$1\n    <script src=\"js/controllers." + this.objectControllerName + ".js\"></script> ",
	      'controllers.'+ this.objectControllerName
	    );
	    addBeforeInFile(
	      destinationRoot + '/www/index.html',
	      /(<script src=\"js\/controllers.js"><\/script>)/,
	      "$1\n    <script src=\"js/controllers." + this.objectsControllerName + ".js\"></script> ",
	      'controllers.'+ this.objectsControllerName
	    );
	    addBeforeInFile(
	      destinationRoot + '/www/index.html',
	      /(<script src=\"js\/services.js"><\/script>)/,
	      "$1\n    <script src=\"js/services." + this.serviceName + ".js\"></script> ",
	      'services.'+ this.serviceName
	    );
	    console.log('更改www/index.html文件');

	    console.log('install');
	}
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
