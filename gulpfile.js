/** Dependencies */
var jshint      = require('gulp-jshint'),
  concat        = require('gulp-concat'),
  rename        = require('gulp-rename'),
  uglify        = require('gulp-uglify'),
  // sass          = require('gulp-sass'),
  compass       = require('gulp-compass'),
  watch         = require('gulp-watch'),
  livereload    = require('gulp-livereload'),
  // wait          = require('gulp-wait'),
  imagemin      = require('gulp-imagemin'),
  rev           = require('gulp-rev'),
  inject        = require('gulp-inject'),
  watch         = require('gulp-watch'),
  plumber       = require('gulp-plumber'),
  child_process = require('child_process'),
  exec          = require('gulp-exec'),
  es            = require('event-stream'),
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
  jsmin     : './assets/js/',
  vendor    : './assets/vendor/',
  css       : './src/css/',
  cssmin    : './assets/css/',
  cssbuild  : './_site/assets/css/',
  img       : './src/images/**/*',
  imgmin    : './assets/images/',
  // images : './client/img/**/*',
  bowerpkg  : './public/components/',


  // When these assets change then we will need jekyll to rebuild
  // This is handled by the jekyll serve command if passed the watch flag??
  posts     : '_posts/*',
  src       : 'src/',
  layouts   : '_layouts/'
};

// Javascripts to concat and load
paths.csssource = [
  paths.bowerpkg + 'bootstrap/dist/css/bootstrap.min.css',
  paths.bowerpkg + 'fontawesome/css/font-awesome.min.css',
  paths.css + '*.css' // Userscripts
];

// JS sources to concatenate and minify
paths.jssource = [
  paths.bowerpkg + 'jquery/jquery.min.js',
  paths.bowerpkg + 'bootstrap/dist/js/bootstrap.min.js',
  paths.bowerpkg + 'bootstrap-validator/dist/validator.min.js',
  paths.bowerpkg + 'jquery.easing/js/jquery.easing.min.js',
  paths.bowerpkg + 'jquery-readingtime-forked/jquery.readingtime.min.js',
  paths.js
];

var defaults = {
  theme     : 'grayscale'
};

var onError = function (err) {
  child_process.spawn('tput', ['bel']);
  console.log(err);
};

gulp.task('copy', function () {
  // Need to copy several sources and then return after finished
  return es.merge(
    // PACE - progress bar (Part of Head)
    gulp.src([paths.bowerpkg + 'pace/**'], {base: './public/components'})
      .pipe(plumber({errorHandler: onError}))
      .pipe(gulp.dest( paths.vendor )),

    // Font awesome fonts (CSS packaged)
    gulp.src(['./public/components/fontawesome/fonts/*'], {base: './public/components/fontawesome'}) //, {base: './public/components'}
      .pipe(plumber({errorHandler: onError}))
      .pipe(gulp.dest( paths.assets ))

  );
});

/** Linting */

// Lint JS
gulp.task('lint', function() {
  return gulp.src( paths.js )
    .pipe(plumber({errorHandler: onError}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    // done( err );
});


/** Optimising */

// Concat & Minify JS
gulp.task('js', ['lint'], function(){
  gulp.src( paths.jssource )
    .pipe(plumber({errorHandler: onError}))
    .pipe(concat('all.js'))
    .pipe(gulp.dest( paths.jsmin ))
    .pipe(rename('all.min.js'))
    .pipe(rev())
    .pipe(uglify())
    .pipe(gulp.dest( paths.jsmin ))
    // Inject revisioned file path into default template
    .pipe(inject('_layouts/default.html', {
      addRootSlash: false,  // ensures proper relative paths
      ignorePath: '/build/' // ensures proper relative paths
    }))
    .pipe(gulp.dest(paths.layouts));
});

/** Concatenates css files - for compressed css, set in compass config
/*  @ depends compass task
*/
gulp.task('css', ['compass'], function(){
  return gulp.src( paths.csssource )
    .pipe(plumber({errorHandler: onError}))
    .pipe(concat('all.css'))
    .pipe(gulp.dest( paths.cssbuild )) // For hot reload only, overwritten on jekyll build
    .pipe(gulp.dest( paths.cssmin ));
});

// To be run once before serving
// injects development css path into template
gulp.task('cssserve', ['css'], function () {
  gulp.src(paths.cssmin + 'all.css')
  .pipe(plumber({errorHandler: onError}))
  .pipe(inject('_layouts/default.html', {
      addRootSlash: false  // ensures proper relative paths
    }))
    .pipe(gulp.dest(paths.layouts));
});

/** Revision CSS file and inject into the default layout */
gulp.task('cssbuild', ['css'], function () {
  gulp.src( paths.cssmin + 'all.css' )
    .pipe(plumber({errorHandler: onError}))
    .pipe(rev())
    .pipe(gulp.dest( paths.cssmin ))
    .pipe(inject('_layouts/default.html', {
      addRootSlash: false
    }))
    .pipe(gulp.dest(paths.layouts));
});

/** Compiling - i.e. sass/compass */
gulp.task('compass', function( done ) {
  return gulp.src( [paths.sass] )
    .pipe(plumber({errorHandler: onError}))
    .pipe(compass({
      config_file: './config.rb',
      css: './src/css',
      sass: './src/sass'
    }))
    .pipe(gulp.dest( paths.css ));
});

/** images */
gulp.task('images', function () {
  gulp.src(paths.img)
    .pipe(plumber({errorHandler: onError}))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.imgmin));
});

/** Watch process - Watch for changes and reload */
gulp.task('watch', function () {
  var server = livereload();
  var spawn = child_process.spawn;

  // Watch the js and css source files
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.sass, ['css']);
  // gulp.watch(paths.img, ['images']);

  // Should watch for new images, doesn't work
  watch({glob: [paths.img]}, function (files) {
      server.changed('image');
  }).pipe(plumber({errorHandler: onError}));

  /** Hot reload */
  // Watch for css changes in _site dir to inject
  gulp.watch(paths.cssbuild + '**').on('change', function(file) {
    console.log('File '+file.path+' was '+file.type+', reloading browser styles...');
    server.changed(file.path);
  });

  /** Full refresh */
  // Watch for changes to _site dir and reload
  // Watches in batch mode to avoid multiple reloads
  watch({glob: ["_site/**/*.html","_site/**/*.js"]}, function (files) {
      server.changed('file');
      console.log('Should have reloaded browser');
  })
  .pipe(plumber({errorHandler: onError}))
  .on('change', function (f) {
    console.log('File '+f.path+' was '+file.type+', reloading browser styles...');
    // console.log("echo $'\e]9;Growl Notification\007'");
  });

  // Changes to source assets should trigger jekyll rebuild
  gulp.watch(['*.html','**.html', '*.md', '*.markdown', '*.yml', 'assets/js/**.js',
    '_posts/**', 'about/**', '_includes/**', '_layouts/**', '_config.yml'], function(file){
      var jekyll = spawn('jekyll', ['build']);
      jekyll.stdout.on('data', function (data) {
        console.log('static file updated!');
        console.log('jekyll: ' + data);
      });
  });
});


/** Build process */

// Jekyll build
gulp.task('jekyll-build', function(){
  var exec = child_process.exec;
  var jekyll = exec('jekyll build');
  return jekyll.stdout.on('data', function (data) {
    console.log(data);
  });

});

/** Build task */
gulp.task('build', ['copy', 'cssbuild', 'js', 'jekyll-build']);

/** Default task - serve and watch for changes (develop) */
gulp.task('serve', ['copy','cssserve','js','jekyll-build','watch'], function(){
  // Serve the site from _site/ directory
  console.log('Starting static web server...\n');
  console.log('Web root: ' + dir);
  console.log('Port    : ' + port);
  console.log('Going to   : http://localhost:' + port);
  try {
    var app = connect()
      .use(connect.static(dir))
      .listen(port);

    child_process.exec('open -a Google\\ Chrome http://localhost:' + port,
      function(error, stdout, stderr){
        if (error && error.length) {
          console.log('Launching Chrome Canary error:\n' + error);
        }
      });

  } catch (e) {
    console.log(e);
  }
});

// Set default task - Development mode
gulp.task('default', ['serve']);

gulp.task('debug', function(){
  console.log(paths.bowerpkg + 'video.js/dist/video-js/video.js','videojs');
});
