var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('default', () =>
    gulp.src('static/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build'))
);