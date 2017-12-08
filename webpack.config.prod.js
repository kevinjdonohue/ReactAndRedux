import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// added a global to be used below for indicating production
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
};

export default {
  debug: true,
  devtool: 'source-map', // switched to source-map
  noInfo: false,
  entry: [path.resolve(__dirname, 'src/index')],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // targeting dist folder -- not src
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(), // optimizes order of files
    new webpack.DefinePlugin(GLOBALS), // allows us to use the global variables
    new ExtractTextPlugin('styles.css'), // allows us to have styles in a separate file
    new webpack.optimize.DedupePlugin(), // eliminates duplicate plugins
    new webpack.optimize.UglifyJsPlugin(), // minifies our JS
  ],
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
      { test: /(\.css)$/, loader: ExtractTextPlugin.extract('css?sourceMap') },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
