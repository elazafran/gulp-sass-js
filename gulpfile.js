/*
* Dependencias
*/
// var gulp = require('gulp'),
//   concat = require('gulp-concat'),
//   uglify = require('gulp-uglify'),
//   sass = require('gulp-sass'),
//   gutil = require('gulp-util');

// /*
// * Configuración de la tarea 'demo'
// */


// gulp.task('styles', function() {
//     gulp.src('sass/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./css/'))
// });

// //Watch task
// gulp.task('default',function() {
//     gulp.watch('sass/**/*.scss',['styles','demo']);
// });

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
 

/** Configuration **/
/*var user = 'u65236019-emecubo';  
var password = 'Pa56word';  
var host = 'home380803416.1and1-data.host';  
var port = 21;  
var localFilesGlob = ['./**//*'];  
var remoteFolder = '/myApp'

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
 /*
gulp.task('ftp-deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: '.', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
    ;
});
*/
/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
 /*
gulp.task('ftp-deploy-watch', function() {

    var conn = getFtpConnection();

    gulp.watch(localFilesGlob)
    .on('change', function(event) {
      console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

      return gulp.src( [event.path], { base: '.', buffer: false } )
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
      ;
    });
});*/


gulp.task('connect', function(){
  connect.server({
    root: 'public',
    livereload: true
  });
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
      .pipe(sass({ errLogToConsole: true }))
      .pipe(gulp.dest('./public/css'));
});

gulp.task('javascript', function () {
  gulp.src('js/*.js')
  .pipe(concat('todo.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./public/js'))
});

gulp.task('livereload', function (){
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});

gulp.task( 'deploy', function () {
 
    var conn = ftp.create( {
        host:     'home380803416.1and1-data.host',
        user:     'u65236019-emecubo',
        password: 'Pa56word',
        parallel: 10,
        log:      gutil.log
    } );
 
    var globs = [
        'src/**',
        'css/**',
        'js/**',
        'fonts/**/*',
        './public/**/*',
        './public/*'
    ];
 
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
 
    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/' ) ) // only upload newer files
        .pipe( conn.dest( '/public_html' ) );
 
} );

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./js/**/*.js', ['javascript']);
  gulp.watch('./public/**/*', ['livereload']);
  gulp.watch('./public/**/*', ['deploy']);
  
});

gulp.task('default', ['connect', 'watch', 'sass','javascript']);


