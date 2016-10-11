var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var del = require('del');

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

gulp.task('nodemon', function () {
    nodemon({
        script: 'server.js',
        watch: ['server.js']
    }).on('change', ['build']);
});

gulp.task('watch', function () {
    gulp.watch('./web/assets/scss/**/*.scss', ['sass']);
});

gulp.task('clean', ['clean-sass']);
gulp.task('build', ['sass']);
gulp.task('default', ['build', 'watch', 'nodemon']);
