/** Dependencies */
var jshint      = require('gulp-jshint'),
  // jshintrep     = require('jshint-junit-reporter'),
  // jshintstylish = require('jshint-stylish'),
  concat        = require('gulp-concat'),
  clean         = require('gulp-clean'),
  rename        = require('gulp-rename'),
  uglify        = require('gulp-uglify'),
  compass       = require('gulp-compass'),
  // livereload    = require('gulp-livereload'),
  browserSync   = require('browser-sync'),
  reload        = browserSync.reload,
  // imagemin      = require('gulp-imagemin'),
  rev           = require('gulp-rev'),
  inject        = require('gulp-inject'),
  // watch         = require('gulp-watch'),
  plumber       = require('gulp-plumber'),
  child_process = require('child_process'),
  // exec          = require('gulp-exec'),
  es            = require('event-stream'),
  gulp          = require('gulp');

/** Server config */
// var connect = require('connect'),
//     path    = require('path'),
//     dir     = './_site',
//     port    = 4444;

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
  // img       : './src/images/**/*',
  // imgmin    : './assets/images/',
  images : './assets/img/',
  bowerpkg  : './bower_components/',

  // When these assets change then we will need jekyll to rebuild
  posts     : '_posts/*',
  src       : 'src/',
  layouts   : '_includes/themes/',

  sitebuild : '_site/*'
};

paths.theme = paths.layouts + 'grayscale/';
paths.default_layout = paths.theme + 'default.html';

// Javascripts to concat and load
paths.csssource = [
  paths.bowerpkg + 'bootstrap/dist/css/bootstrap.min.css',
  paths.bowerpkg + 'fontawesome/css/font-awesome.min.css',
  // paths.vendor + 'pace/themes/min.pace-theme-minimal.css',
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
// https://1000hz.github.io/bootstrap-validator/

var defaults = {
  theme     : 'grayscale'
};

var onError = function (err) {
  child_process.spawn('tput', ['bel']);
  console.log(err);
};

// browser-sync task for starting the server.
// gulp.task('browser-sync', function() {
// });

gulp.task('copy', function () {
  // Need to copy several sources and then return after finished
  return es.merge(
    // PACE - progress bar (Part of Head)
    // gulp.src([paths.bowerpkg + 'pace/**'], {base: './public/components'})
    //   .pipe(plumber({errorHandler: onError}))
    //   .pipe(gulp.dest( paths.vendor )),

    // Font awesome fonts (CSS packaged)
    gulp.src(['./public/components/fontawesome/fonts/*'], {base: './public/components/fontawesome'}) //, {base: './public/components'}
      .pipe(plumber({errorHandler: onError}))
      .pipe(gulp.dest( paths.assets )),

    gulp.src([paths.bowerpkg + 'jquery/jquery.min.map'])
      .pipe(plumber({errorHandler: onError}))
      .pipe(gulp.dest( paths.jsmin ))

  );
});

/** Linting */

// Lint JS
gulp.task('lint', function() {
  return gulp.src( paths.js )
    .pipe(plumber({errorHandler: onError}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


/** Optimising */

// Concat & Minify JS
gulp.task('js', ['lint'], function(){

  var target = gulp.src(paths.default_layout),
    sources = gulp.src(paths.jssource),

    js = sources.pipe(concat('all.js'))
      .pipe(gulp.dest( paths.jsmin ))
      .pipe(rename('all.min.js'))
      .pipe(rev())
      .pipe(uglify())
      .pipe(gulp.dest( paths.jsmin ));

    return target.pipe(inject( js ))
      .pipe(gulp.dest( paths.theme ));
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
  var target = gulp.src(paths.default_layout),
    sources = gulp.src(paths.cssmin + 'all.css', {read: false});

  return target.pipe(inject( sources ))
      .pipe(gulp.dest( paths.theme ));
});

/** Revision CSS file and inject into the default layout */
gulp.task('cssbuild', ['css'], function () {
  var target = gulp.src(paths.default_layout),
    sources = gulp.src(paths.cssmin + 'all.css');

  var css = sources
    .pipe(rev())
    .pipe(gulp.dest( paths.cssmin ));

  return target.pipe(inject( css ))
      .pipe(gulp.dest( paths.theme ));
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
    .pipe(gulp.dest( paths.css ))
    .pipe(reload({stream:true}));
});

/** images */
gulp.task('images', function () {
  // gulp.src(paths.images + '**')
  //   .pipe(plumber({errorHandler: onError}))
  //   .pipe(imagemin())
  //   .pipe(gulp.dest(paths.images));
});

/** Watch process - Watch for changes and reload */
gulp.task('watch', function () {
  // var server = livereload();
  var exec = child_process.exec;

  // Watch the js and css source files
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.sass, ['css']);
  // gulp.watch(paths.img, ['images']);

  // Should watch for new images, doesn't work
  // watch({glob: [paths.images + '**']}, function (files) {
  //     // server.changed('image'); // Why do I want to reload the browser when an images chages? Surely better to trigger image optimisation on build or server
  // }).pipe(plumber({errorHandler: onError}));

  /** Hot reload */
  // Watch for css changes in _site dir to inject
  gulp.watch(paths.cssbuild + '**').on('change', function(file) {
    console.log('File '+file.path+' was '+file.type+', reloading browser styles...');
    reload({stream:false});
    // server.changed(file.path);
  });

  /** Full refresh */
  // Watch for changes to _site dir and reload
  // Watches in batch mode to avoid multiple reloads
  // watch({glob: ["_site/**/*.html","_site/**/*.js"]}, function (files) {
  //     // server.changed('file');
  //     console.log('Should have reloaded browser');
  //     // return files;
  // })
  // .pipe(plumber({errorHandler: onError}))
  // .on('change', function (f) {
  //   console.log('File '+f.path+' was '+file.type+', reloading browser styles...');
  //   // console.log("echo $'\e]9;Growl Notification\007'");
  // });

  // Changes to source assets should trigger jekyll rebuild
  gulp.watch(['*.html','**.html', '*.md', '*.markdown', '*.yml', '*.xml', 'assets/js/**.js',
    '_posts/**', '_drafts/**', 'about/**', '_includes/**', 'categories/**', 'tags/**', '_config.yml'],[
    function(file){
      // gulp.start('clean');
      var jekyll = exec('bundle exec jekyll build --drafts');
      jekyll.stdout.on('data', function (data) {
        console.log('static file updated! running jekyll build');
        console.log('jekyll: ' + data);
      });
    }]);
});


/** Build process */

// Jekyll build
gulp.task('jekyll-build', function(){
  var exec = child_process.exec;
  var jekyll = exec('bundle exec jekyll build --drafts');
  return jekyll.stdout.on('data', function (data) {
    console.log(data);
  });

});

/** Clean tasks **/
gulp.task('clean', function () {
  return gulp.src( [paths.sitebuild, "assets/css/all-*.css", "assets/js/all.min-*.js"] , {read: false})
    .pipe(clean());
});

/** Build task */
gulp.task('build', ['copy', 'cssbuild', 'js', 'images', 'jekyll-build']);

/** Default task - serve and watch for changes (develop) */
gulp.task('serve', ['copy','cssserve','js', 'images', 'jekyll-build','watch'], function(){

  browserSync({
    ui: {
        weinre: {
          port:9090
        }
    },
    port:8080,
    server: {
        baseDir: "./_site/"
    }
  });


  // Serve the site from _site/ directory
  // console.log('Starting static web server...\n');
  // console.log('Web root: ' + dir);
  // console.log('Port    : ' + port);
  // console.log('Going to   : http://localhost:' + port);
  // try {
  //   var app = connect()
  //     .use(connect.static(dir))
  //     .listen(port);

  //   child_process.exec('open -a Google\\ Chrome http://localhost:' + port,
  //     function(error, stdout, stderr){
  //       if (error && error.length) {
  //         console.log('Launching Chrome Canary error:\n' + error);
  //       }
  //     });

  // } catch (e) {
  //   console.log(e);
  // }
});

// Set default task - Development mode
gulp.task('default', ['serve']);
