var path = require('path');

module.exports = {
  entry: {
    background: './app/scripts/background.js',
    popup: './app/scripts/popup.jsx',
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
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' },
      { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
    ],
  },
};
