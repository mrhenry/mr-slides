var babel = require('gulp-babel');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('javascript', function() {
    return gulp.src('src/mr-slides.js')
        .pipe( babel() )
        .pipe( gulp.dest('dist') )
        .pipe( uglify() )
        .pipe( rename(function(path) {
            path.extname = '.min.js';
        }))
        .pipe( gulp.dest('dist') );
});

gulp.task('stylesheets', function() {
    return gulp.src('src/standalone.scss')
        .pipe( sass() )
        .pipe( gulp.dest('dist'));
})

gulp.task('default', ['stylesheets', 'javascript'], function() {
    gulp.watch('src/*.scss', ['stylesheets']);
    gulp.watch('src/mr-slides.js', ['javascript']);
});
