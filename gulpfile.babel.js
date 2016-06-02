import gulp from 'gulp';
import livereload from 'gulp-livereload';
import webpack from 'gulp-webpack';
import webpackConfig from './webpack.config';

gulp.task('webpack', () => gulp.src([
  './app/scripts/background.js',
  './app/scripts/popup.jsx',
])
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('dist/scripts'))
);

gulp.task('copy', () => gulp.src(['app/**/*', '!app/scripts/**/*'])
  .pipe(gulp.dest('dist'))
);

gulp.task('watch', ['copy', 'webpack'], () => {
  livereload.listen();
  gulp.watch(['app/**/*', '!app/scripts/**/*'], ['copy']);
  gulp.watch('app/scripts/**/*', ['webpack']);
});

gulp.task('default', ['copy', 'webpack']);
