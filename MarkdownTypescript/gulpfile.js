var gulp =          require('gulp');
var sass =          require('gulp-sass');
var sourcemaps =    require('gulp-sourcemaps');
var shell =         require('gulp-shell')

gulp.task('sass', function() {
    return gulp.src('./css/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});

gulp.task('typescript', shell.task('tsc'));

gulp.task('default', ['sass', 'typescript']);