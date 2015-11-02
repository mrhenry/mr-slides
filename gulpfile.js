var babel = require('gulp-babel');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var git = require('gulp-git');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var tagVersion = require('gulp-tag-version');
var uglify = require('gulp-uglify');

gulp.task('javascript', function() {
    return gulp.src('src/mr-slides.js')
        .pipe( babel({
            'modules': 'umd'
        }) )
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
});

gulp.task('default', ['stylesheets', 'javascript'], function() {
    gulp.watch('src/*.scss', ['stylesheets']);
    gulp.watch('src/mr-slides.js', ['javascript']);
});

/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

function release(importance) {
    // get all the files to bump version in
    return gulp.src(['./package.json'])
        // bump the version number in those files
        .pipe(bump({type: importance}))
        // save it back to filesystem
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('bumps package version'))

        // read only one file to get the version number
        .pipe(filter('package.json'))
        // **tag it in the repository**
        .pipe(tagVersion());
}

gulp.task('patch', function() { return release('patch'); })
gulp.task('feature', function() { return release('minor'); })
gulp.task('release', function() { return release('major'); })
