// var Combine = require('stream-combiner');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var watch = require('gulp-watch');

// var File = require('vinyl');
var gulp = require('gulp');
var child_process = require('child_process');

/** Define sources and paths */
var paths = {
  assets   : './app/assets/',
  src      : './src/',
  images   : './client/img/**/*',
  posts    : './_posts/',
};
paths.sass_src = paths.src + 'sass/*.scss',
paths.js_src   = paths.src + 'js/*.js',
paths.css_src  = paths.assets + 'css/';
paths.css      = paths.css_src + "*.css";
paths.js       = paths.assets + "js";

gulp.task('stub', function(){
  console.dir(paths, 'paths');
});


/** Linting */

// Lint JS
gulp.task('lint', function() {
  return gulp.src( paths.js_src )
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


/** Optimising */

// Concat & Minify JS
gulp.task('js', function(){
  gulp.src( paths.js_src )
    .pipe(concat('all.js'))
    .pipe(gulp.dest( paths.js ))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest( paths.js ));
    // .pipe(gulp.dest( paths.js ));
});

/** Concatenates css files
/*  @ depends compass task
*/
gulp.task('css', function(){
  return gulp.src( paths.styles )
    .pipe(concat('all.css'))
    .pipe(gulp.dest( paths.css ));
});

/** Compiling - i.e. sass/compass */
gulp.task('compass', function() {
    return gulp.src( paths.sass_src )
      // .pipe(watch())
      .pipe(compass({
        config_file: './config.rb',
        css: './app/assets/css',
        sass: './src/sass'
      }))
      .pipe(gulp.dest( paths.css_src));
});


/**  Serve - test server and live reload etc */

// Run the jekyll server
gulp.task('jekyllServe', function(){
  child_process.spawn('jekyll', ['serve'], {stdio: 'inherit'});
});

/** Watch process - Watch for changes */


/** Build process */

// Jekyll build
gulp.task('jekyllBuild', function(){
  child_process.spawn('jekyll', ['build'], {stdio: 'inherit'});
});

/**
 * Task groups
 */



// gulp.task('compass-build', function () {

// })




// Default
gulp.task('default', function(){
  gulp.run('lint', 'minify');
  // gulp.run('lint', 'minify');

  // Watch JS Files
  gulp.watch("./src/js/*.js", function(event){
    gulp.run('lint', 'minify');
  });
});
