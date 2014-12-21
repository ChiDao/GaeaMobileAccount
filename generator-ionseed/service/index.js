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
    serviceName: function () {
      var done = this.async();
      this.prompt({
        type    : 'input',
        name    : 'serviceName',
        message : 'Service名称：',
        default : 'newService' // Default to current folder name
      }, function (answers) {
        this.serviceName = this._.camelize(this._.slugify(this._.humanize(answers.serviceName))).replace(/^(\w)/, function(m){return m.toUpperCase();}); 
        done();
      }.bind(this));
    }
  },
  configuring: function () {
  },
  writing: function(){
    this.template(
      '_service.js',
      'www/js/services.' + this.serviceName + '.js', 
      {
        angularApp: this.config.get('angularApp'),
        serviceName: this.serviceName
      });
    console.log('复制Service文件。');
  },
  conflicts: function () {
    console.log('conflicts');
  },
  install: {
    modifileFile: function () {
      //修改controllers.js文件
      var destinationRoot = process.cwd();

      //修改services.js文件
      addBeforeInFile(
        destinationRoot + '/www/js/services.js',
        /(angular.module\(\s*\'starter\.services\'\s*,\s*\[)/,
        '$1\'services.'+ this.serviceName + '\', ',
        'services.'+ this.serviceName
      )
      console.log('更改www/js/services.js文件');

      addBeforeInFile(
        destinationRoot + '/www/index.html',
        /(<script src=\"js\/services.js"><\/script>)/,
        "$1\n    <script src=\"js/services." + this.serviceName + ".js\"></script> ",
        'services.'+ this.serviceName
      );
      console.log('更改www/index.html文件');
    }  },
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
