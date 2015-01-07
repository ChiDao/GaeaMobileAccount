

var sh = require('shelljs');
var bower = require('bower');

var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var rjs = require('requirejs');

var jade = require('gulp-jade');

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var paths = {
  scripts: ['www/js/**/*.js'],
  sass: ['www_pre/scss/**/*.scss'],
  jade: ['www_pre/jade/**/*.jade'],
  buildCopy: [
    '**/hooks/**/*',
    '**/www/css/**/*',
    '**/www/img/**/*',
    '**/www/templates/**/*',
    '**/www/index.html',
    '**/www/bootstrap.js',
    '**/www/loader.bootstrap.js',
    '**/www/loader.html',
    'bower.json',
    'config.xml',
    'gulpfile.js',
    'icon.png',
    'package.json',
    'splash.png',
    '!built_distribute/**/*',
    '!plugins/**/*',
    '!plugins-back/**/*',
    '!node_modules/**/*',
    '!platforms/**/*',
  ],
  buildScripts: [
    'www/**/require.js',
    'www/**/angular.js', 
    'www/**/ionic.bundle.js.js',
    'www/**/purl.js', 
    'www/**/lodash.js', 
    'www/**/dist/restangular.js', 
    'www/**/loader.app.js', 
    'www/**/services.LiveUpdate.js',
    'www/**/angular-messages.js', 
    'www/**/angular-translate.js', 
    'www/**/angular-translate-handler-log.js',
    'www/**/angular-cookies.js', 
    'www/**/angular-translate-storage-cookie.js', 
    'www/**/angular-translate-storage-local.js',
    'www/**/angular-translate-handler-log.js',
    'www/**/angular-translate-handler-log.js',
    'www/**/js/*.js',
    '!platforms/**/*.js'
    ]
};

gulp.task('default', ['sass']);

//----------
// .js文件
//----------
gulp.task('hint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//----------
// .jade文件
//----------
gulp.task('jade', function (done) {
    return gulp.src(paths.jade)
      .pipe(jade())
      .pipe(gulp.dest('./www/templates/'))
      .on('end', done);
});

//----------
// .scss文件
//----------
gulp.task('sass', function(done) {
  gulp.src('www_pre/scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});



//==========
// .scss文件
//==========
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


//==========
// built
//==========
gulp.task('build', ['build-scripts', 'build-copy']);

gulp.task('build-scripts', function(cb){
  gulp.src(paths.buildScripts)
  .pipe(uglify())
  .pipe(gulp.dest('../built_client/www'))
});

gulp.task('build-copy', function(cb){
  gulp.src(paths.buildCopy)
  .pipe(gulp.dest('../built_client/'))
});

