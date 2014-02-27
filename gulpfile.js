// var Combine = require('stream-combiner');
var jshint      = require('gulp-jshint'),
  concat        = require('gulp-concat'),
  rename        = require('gulp-rename'),
  uglify        = require('gulp-uglify'),
  sass          = require('gulp-sass'),
  compass       = require('gulp-compass'),
  watch         = require('gulp-watch'),
  reload        = require('gulp-livereload'),
  images        = require('gulp-imagemin'),
  // rev        = require('gulp-rev'),
  // inject     = require('gulp-inject'),
  child_process = require('child_process'),
  gulp          = require('gulp');

/** Define sources and paths */
var paths = {
  assets    : './assets/',
  sass      : './src/sass/*.scss',
  sasscfg   : './config.rb',
  js        : './src/js/*.js',
  css       : './src/css/',
  cssmin    : './assets/css/',
  jsmin     : './assets/js/',
  img       : './src/images/**/*',
  imgmin    : './assets/images/',
  // images : './client/img/**/*',

  // When these assets change then we will need jekyll to rebuild
  // This is handled by the jekyll serve command if passed the watch flag??
  posts     : './_posts/*',
  layouts   : './_layouts/*'
};

// gulp.task('live-reload', function(){
//   gulp.watch(, function(){
//     console.log();
//   });
// });


/** Linting */

// Lint JS
gulp.task('lint', function( done ) {
  return gulp.src( paths.js )
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    done( err );
});


/** Optimising */

// Concat & Minify JS
gulp.task('js', ['lint'], function(){
  gulp.src( paths.js )
    .pipe(concat('all.js'))
    .pipe(gulp.dest( paths.jsmin ))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest( paths.jsmin ));
});

/** Concatenates css files - for compressed css, set in compass config
/*  @ depends compass task
*/
gulp.task('css', ['compass'], function(){
  return gulp.src( paths.css + '*.css' )
    .pipe(concat('all.css'))
    .pipe(gulp.dest( paths.cssmin ));


    // Note: not minifying here as this will be done in the compass config
});

/** Compiling - i.e. sass/compass */
gulp.task('compass', function( done ) {
    return gulp.src( paths.sass )
      .pipe(compass({
        config_file: './config.rb',
        css: './src/css',
        sass: './src/sass'
      }))
      .pipe(gulp.dest( paths.css ));

      done(err);
});


/**  Serve - test server and live reload etc */

// Run the jekyll server
gulp.task('jekyll-serve', function(){
  child_process.spawn('jekyll', ['serve', '--watch'], {stdio: 'inherit'});
});

/** Watch process - Watch for changes */
gulp.task('watch', function () {
  gulp.watch(paths.js_src, ['js']);
  gulp.watch(paths.sass_src, ['css']);

  // This is an expensive operation - only run for new posts or layout changes
  // gulp.watch([paths.posts, paths.layouts], ['jekyll-build']);
  child_process.spawn('jekyll', ['serve', '--watch'], {stdio: 'inherit'});
});



/** Build process */

// Jekyll build
gulp.task('jekyll-build', function(){
  child_process.spawn('jekyll', ['build'], {stdio: 'inherit'});
});

/**
 * Task groups
 */

gulp.task('serve', ['watch', 'jekyll-serve']);

gulp.task('build', ['css', 'js', 'jekyll-build']);



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
