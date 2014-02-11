var Combine = require('stream-combiner');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var File = require('vinyl');
var gulp = require('gulp');
var child_process = require('child_process');

var paths = {
  scripts: 'src/js/*.js',
  images: 'client/img/**/*',
  posts: '_posts/'
};

// New post
gulp.task('post', function () {
  var newPost = new File({
    base: paths.posts,
    path: paths.posts + "2.md",
    contents: new Buffer("test = dimitri")
  });
});


// Lint JS
gulp.task('lint', function() {
  return gulp.src(['src/js/plugins.js', 'src/js/main.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concat & Minify JS
gulp.task('minify', function(){

  return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', function(){
  child_process.spawn('jekyll', ['serve'], {stdio: 'inherit'});
});

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
