// Plugins

var gulp = require('gulp'),

	changed = require('gulp-changed'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

// Variables	

var jsSrc = '0js/*.js',
	jsDist = './dist/js',
	sassSrc = '0scss/*.scss';

// Tasks

gulp.task('sass', function() {									/*sass*/
	return sass(sassSrc)
	.pipe(plumber())
	.pipe(autoprefixer({
		browsers: ['last 4 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {								/*js*/
	return gulp.src(jsSrc)
	.pipe(plumber())
	.pipe(changed(jsDist))
	.pipe(concat('main.js'))
	.pipe(gulp.dest(jsDist));
});

gulp.task('sass-watch', ['sass'], browserSync.reload);			/*bs-sass*/

gulp.task('js-watch', ['scripts'], browserSync.reload);			/*bs-js*/

gulp.task('watch', function() {									/*watch*/
	browserSync({
		server: {
			baseDir: 'dist/'
		}
	});
	gulp.watch(jsSrc, ['js-watch']);
	gulp.watch(sassSrc, ['sass-watch']);
	gulp.watch('dist/*.html', function() {
		browserSync.reload();
	});
});

// Default Task

gulp.task('default', ['watch'], function(){});					/*pfff...*/
