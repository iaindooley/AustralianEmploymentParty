var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

gulp.task('minifyJS', function () {
    var stream = gulp.src('js/scripts.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
    return stream;
});

gulp.task('sass', function () {
    var stream = gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
    return stream;
});

gulp.task('autoprefix', function () {
    var stream = gulp.src('css/styles.css')
        .pipe(autoprefix('last 5 versions', 'ie 9'))
        .pipe(gulp.dest('css'));
    return stream;
});

gulp.task('uglifyCSS', function () {
    var stream = gulp.src('css/styles.css')
        .pipe(uglifycss())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
    return stream;
});

gulp.task('compileCSS', function (callback) {
    runSequence(
        'sass',
        'autoprefix',
        'uglifyCSS',
        callback
    );
});

gulp.task('serve', ['compileCSS', 'minifyJS'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("sass/**/*.scss", ['compileCSS']);
    gulp.watch("js/**/*.js", ['minifyJS']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});

gulp.task('build', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['minifyJS']);
});

gulp.task('default', ['serve']);
