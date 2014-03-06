/** Dependencies */
var jshint      = require('gulp-jshint'),
  concat        = require('gulp-concat'),
  rename        = require('gulp-rename'),
  uglify        = require('gulp-uglify'),
  sass          = require('gulp-sass'),
  compass       = require('gulp-compass'),
  watch         = require('gulp-watch'),
  livereload    = require('gulp-livereload'),
  wait          = require('gulp-wait'),
  images        = require('gulp-imagemin'),
  // rev        = require('gulp-rev'),
  // inject     = require('gulp-inject'),
  watch         = require('gulp-watch'),
  // plumber       = require('gulp-plumber'),
  child_process = require('child_process'),
  gulp          = require('gulp');

/** Server config */
var connect = require('connect'),
    path    = require('path'),
    dir     = './_site',
    port    = 4444;

/** Sources and paths */
var paths = {
  assets    : './assets/',
  sass      : './src/sass/*.scss',
  sasscfg   : './config.rb',
  js        : './src/js/*.js',
  css       : './src/css/',
  cssmin    : './assets/css/',
  cssbuild  : './_site/assets/css/',
  jsmin     : './assets/js/',
  img       : './src/images/**/*',
  imgmin    : './assets/images/',
  // images : './client/img/**/*',

  // When these assets change then we will need jekyll to rebuild
  // This is handled by the jekyll serve command if passed the watch flag??
  posts     : './_posts/*',
  layouts   : './_layouts/*'
};


/** Linting */

// Lint JS
gulp.task('lint', function( done ) {
  return gulp.src( paths.js )
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    // done( err );
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
    .pipe(gulp.dest( paths.cssmin ))
    .pipe(gulp.dest( paths.cssbuild )); // For hot reload only, will get overwritten by jekyll build

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

/** Watch process - Watch for changes and reload */
gulp.task('watch', function () {
  var s = livereload();
  var spawn = child_process.spawn;

  // Watch the js and css source files
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.sass, ['css']);

  // Watch for css changes in _site dir to inject
  gulp.watch(paths.cssbuild + '**').on('change', function(file) {
    console.log('File '+file.path+' was '+file.type+', reloading browser styles...');
    s.changed(file.path);
  });

  // Watch for changes to _site dir and reload
  watch({glob: ["_site/**/*.html","_site/**/*.js"]}, function (files) {
      s.changed('file');
  });

  // Any other changes will need to trigger jekyll build
  gulp.watch(['*.html', '*.yml', 'assets/js/**.js',
    '_posts/**', '_includes/**', '_layouts/**'], function(file){
      jekyll = spawn('jekyll', ['build']);
      jekyll.stdout.on('data', function (data) {
        console.log('jekyll: ' + data);
      });
  });
});


/** Build process */

// Jekyll build
// gulp.task('jekyll-build', function(){
//   // child_process.spawn('jekyll', ['build'], {stdio: 'inherit'});
//   child_process.exec('jekyll build');
// });

/**
 * Task groups
 */
// NOTE: currently not working
gulp.task('build', ['css', 'js', 'jekyll-build']);

/** Default task - serve and watch for changes (develop) */
gulp.task('serve', ['watch'], function(){

  // Serve the site from _site/ directory
  console.log('Starting static web server...\n');
  console.log('Web root: ' + dir);
  console.log('Port    : ' + port);
  console.log('Going to   : http://localhost:' + port);
  try {
    var app = connect()
      .use(connect.static(dir))
      .listen(port);

    child_process.exec('open -a Google\\ Chrome\\ Canary http://localhost:' + port,
      function(error, stdout, stderr){
        if (error && error.length) {
          console.log('Launching Chrome Canary error:\n' + error);
        }
      });

  } catch (e) {
    console.log(e);
  }
});

// Default task - Development mode
gulp.task('default', ['serve']);
