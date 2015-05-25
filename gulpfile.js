var gulp = require('gulp');
var react = require('gulp-react');
var watch = require('gulp-watch')


gulp.task('compile-source', function(){
    return gulp.src('src/*.jsx')
    .pipe(watch('src/*.jsx'))
    .pipe(react())
    .pipe(gulp.dest('js/build'));
});

gulp.task('compile-tests-spec', function(){
    return gulp.src('spec/*.jsx')
    .pipe(watch('spec/*.jsx'))
    .pipe(react())
    .pipe(gulp.dest('build-spec'));
});

gulp.task('default', ['compile-source','compile-tests-spec']);
