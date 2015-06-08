var gulp = require('gulp')
    , del = require('del')
    , changed = require('gulp-changed')
    , react = require('gulp-react')
    , webpack = require('gulp-webpack');

var SRC = 'src/**/*.jsx';
var SPEC_LOCATION = 'spec/**/*.jsx';

gulp.task('compile', function () {
    return gulp.src(SRC)
        .pipe(changed("js/build"))
        .pipe(webpack({
            entry: "./src/app.jsx",
            module: {
                loaders: [
                    {test: /\.jsx/, loader: 'jsx-loader?harmony'}
                ]
            },
            devtool: '#inline-source-map',
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('js/build'));
});

gulp.task('compile-test', function () {
    return gulp.src(SPEC_LOCATION)
        .pipe(changed("build-spec"))
        .pipe(webpack({
            entry: "./spec/AppSpec.jsx",
            module: {
                loaders: [
                    {test: /\.jsx/, loader: 'jsx-loader?harmony'}
                ]
            },
            devtool: '#inline-source-map',
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('build-spec'));
});

gulp.task('clean', function () {
    del("js/build");
    del("build-spec");
});

gulp.task('watch', ['compile', 'compile-test'], function () {
    gulp.watch(SRC, ['compile']);
    gulp.watch(SPEC_LOCATION, ['compile-test']);
});

gulp.task('default', ['clean', 'watch']);
