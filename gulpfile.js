var gulp = require('gulp');
var sass = require('gulp-sass');

var sassInput = 'src/**/*.scss';
var sassOutput = 'src/';
var sassOptions = {};

gulp.task('sass', function () {
    return gulp
        .src(sassInput)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest(sassOutput));
});

gulp.task('watch', function() {
    return gulp
        .watch(sassInput, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['sass', 'watch']);