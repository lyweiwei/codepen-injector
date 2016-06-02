import path from 'path';
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import webpack from 'webpack';
import Promise from 'bluebird';

gulp.task('webpack', () => Promise.promisify(webpack)({
  entry: {
    background: './app/scripts/background',
    popup: './app/scripts/popup',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist/scripts'),
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015',
      },
    ],
  },
}));

gulp.task('copy', () => gulp.src(['app/**/*', '!app/scripts/**/*'])
  .pipe(gulp.dest('dist'))
);

gulp.task('watch', ['copy', 'webpack'], () => {
  livereload.listen();
  gulp.watch(['app/**/*', '!app/scripts/**/*'], ['copy']);
  gulp.watch('app/scripts/**/*', ['webpack']);
});

gulp.task('default', [
  'copy',
]);
