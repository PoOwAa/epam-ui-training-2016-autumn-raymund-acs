var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var del = require('del');
var mainBowerFiles = require('main-bower-files');

gulp.task('sass', function () {
    return gulp.src('./web/assets/scss/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./web/assets/css'));
});

gulp.task('clean-sass', function () {
    return del(['./web/assets/css']);
});

gulp.task('lint', function () {
    return gulp.src('./web/assets/js/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'server.js',
        watch: ['server.js']
    }).on('change', ['build']);
});

gulp.task('watch', function () {
    gulp.watch('./web/assets/js/app/**/*.js', ['lint']);
    gulp.watch('./web/assets/scss/**/*.scss', ['sass']);
});

gulp.task('bower', function(){
    gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./web/assets/js/lib'));
});

gulp.task('clean-bower', function() {
    return del(['./web/asserts/js/lib']);
});

gulp.task('clean', ['clean-sass', 'clean-bower']);
gulp.task('build', ['sass', 'bower']);
gulp.task('default', ['build', 'watch', 'nodemon']);
