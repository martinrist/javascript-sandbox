const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('default', function() {

    // Run ESLint
    gulp.src("chapter*/*.js")
        .pipe(eslint())
        .pipe(eslint.format());

    //gulp.src("chapter*/*.js")
    //    .pipe(babel())
    //    .pipe(gulp.dest("dist"));

});