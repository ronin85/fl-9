'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const uglifyjs = require('gulp-uglifyjs');
const babel = require('gulp-babel');
const del = require('del');
const rename = require('gulp-rename');
const jshint = require('jshint');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
sass.compiler = require('node-sass');

//configuration file
let config = {
    paths: {
        src: {
            html: './src/*.html',
            sass:  './src/sass/*.scss',
            js: './src/js/*.js'
        },
        temp: {
            html: './src/temp/*.html',
            css: './src/temp/*.css',
            js: './src/temp/*.js'
        },
        dist: {
            html: './dist/',
            css: './dist/css',
            js: './dist/js'
        }
    },
    server: {
        root: './src/temp',
        port: 8080,
        livereload: true
    },
    clean: ['./src/temp', './dist']
};

gulp.task('connect', function(){
    connect.server(config.server);
});

gulp.task('clean', function(){
    del([config.clean]).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
}); 

gulp.task('jshint', function(){
    gulp.src([config.paths.temp.js, config.paths.src.js])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('liveReload', function () {
    gulp.src([config.paths.temp.css, config.paths.temp.js])
        .pipe(watch([config.paths.src.sass, config.paths.src.js]))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch([config.paths.src.html], ['html']);
    gulp.watch([config.paths.src.sass], ['styles']);
    gulp.watch([config.paths.src.js], ['js']);
});

gulp.task('copy', function () {
    gulp.src([config.paths.temp.html, config.paths.temp.css, config.paths.temp.js])
        .pipe(gulp.dest('./dist'));
});

gulp.task('html', function(){
    gulp.src(config.paths.src.html)
    .pipe(sourcemaps.init())
    .pipe(rename('index.html'))
    .pipe(sourcemaps.write('./source-map'))
    .pipe(gulp.dest('./src/temp/'))
    .pipe(connect.reload());
});

gulp.task('styles', function(){
    gulp.src(config.paths.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('./source-map'))
    .pipe(gulp.dest('./src/temp/'))
    .pipe(connect.reload());
});

gulp.task('js', function(){
    gulp.src([config.paths.src.js, '**/moment.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglifyjs())
    .pipe(sourcemaps.write('./source-map'))
    .pipe(gulp.dest('./src/temp/'))
    .pipe(connect.reload());
});

gulp.task('build', function () {
    runSequence('clean', ['js', 'styles', 'html']);
});

gulp.task('default', function () {
    runSequence('build', 'connect', 'liveReload', 'watch');
});

gulp.task('build-prod', function () {
    runSequence('clean', 'copy');
});