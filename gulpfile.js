var gulp = require('gulp');
var react = require('gulp-react');
var watch = require('gulp-watch');
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");

gulp.task('compile-source', function () {
    return gulp.src('src/*.jsx')
        .pipe(watch('src/*.jsx'))
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js/build'));
});

gulp.task('compile-tests-spec', function () {
    return gulp.src('spec/*.jsx')
        .pipe(watch('spec/*.jsx'))
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build-spec'));
});

gulp.task('default', ['compile-source', 'compile-tests-spec']);
