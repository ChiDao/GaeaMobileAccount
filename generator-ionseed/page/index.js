var yeoman = require('yeoman-generator');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

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
    pageName: function () {
      var done = this.async();
      this.prompt(
      {
        type    : 'input',
        name    : 'pageName',
        message : 'Page名称：',
        default : 'newPage' // Default to current folder name
      }, function (answers) {
        this.pageName = this._.camelize(this._.slugify(this._.humanize(answers.pageName))); 
        this.pageNameDasherize = this._.dasherize(this.pageName);
        this.pageNameUnderscored = this._.underscored(this.pageName);
        this.controllerName = this.pageName.replace(/^(\w)/, function(m){return m.toUpperCase();}) + 'Ctrl';       
        done();
      }.bind(this));
    },
    pageTitle: function () {
      var done = this.async();
      this.prompt(
      {
        type    : 'input',
        name    : 'pageTitle',
        message : 'Page标题：',
        default : this._.titleize(this._.humanize(this.pageName)) // Default to current folder name
      }, function (answers) {
        this.pageTitle = answers.pageTitle;
        done();
      }.bind(this));
    },
    needCss: function(){
      var done = this.async();
      this.prompt({
        type    : 'confirm',
        name    : 'needCss',
        message : '是否需要单独Css文件：',
        default : false // Default to current folder name
      }, function (answers) {
        this.needCss = answers.needCss;
        done();
      }.bind(this));
    },
    stateUrl: function () {
      var done = this.async();
      this.prompt(
      {
        type    : 'input',
        name    : 'stateUrl',
        message : 'Page State Url：',
        default : this.pageNameUnderscored // Default to current folder name
      }, function (answers) {
        this.stateUrl = this._.underscored(this._.slugify(this._.humanize(answers.stateUrl)));  
        done();
      }.bind(this));
    },
  },
  configuring: function () {
  },
  writing: function(){
    this.template(
      '_page.jade',
      'www_pre/jade/' + this.pageNameDasherize  + '.jade', 
      {
        pageTitle: this.pageTitle,
        pageName: this.pageName
      });
    // this.template(
    //   '_page.html',
    //   'www/templates/' + this.pageNameDasherize  + '.html', 
    //   {
    //     pageTitle: this.pageTitle,
    //     pageName: this.pageName
    //   });

    this.template(
      '_page.controller.js',
      'www/js/controllers.' + this.controllerName + '.js', 
      {
        controllerName: this.controllerName
      });

    console.log('复制Page文件。');
    if (this.needCss){
      this.copy('page.css', 'www/css/' + this.pageName + '.css')
    }
  },
  conflicts: function () {
    console.log('conflicts');
  },
  install: {
    modifileFile:function () {
      //修改controllers.js文件
      var destinationRoot = process.cwd();
      addBeforeInFile(
        destinationRoot + '/www/js/controllers.js',
        /(angular.module\(\s*\'starter\.controllers\'\s*,\s*\[)/,
        '$1\'controllers.'+ this.controllerName + '\', ',
        'controllers.'+ this.controllerName
      )
      console.log('更改www/js/controllers.js文件');

      //修改index.html文件
      addBeforeInFile(
        destinationRoot + '/www/js/app.js',
        /(stateProviderPlaceHolder)/,
        "$1\n\n" +
        "      .state('app." + this.pageNameDasherize + "', {\n" +
        "      url: '/" + this.stateUrl + "',\n" +
        "      views: {\n" +
        "        'menuContent': {\n" +
        "          templateUrl: 'templates/" + this.pageNameDasherize  + ".html',\n" +
        "          controller: '" + this.controllerName + "'\n" +
        "        }\n" +
        "      },\n" +
        "      data: {\n" +
        "        access: access.public\n" +
        "      }\n" +
        "    })\n",
        this.controllerName
      );
      console.log('更改www/js/app.js文件');

      //修改index.html文件
      addBeforeInFile(
        destinationRoot + '/www/index.html',
        /(<script src=\"js\/controllers.js"><\/script>)/,
        "$1\n    <script src=\"js/controllers." + this.controllerName + ".js\"></script> ",
        'controllers.'+ this.controllerName
      );
      console.log('更改www/index.html文件');
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
