const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: {
    // app: './src/index/js/index.js',
    holding: './src/holding-page/js/index.js',
    error: './src/error/js/error.js'
  },
  output: {
    path: path.resolve(__dirname, '_build'),
    filename: 'assets/js/[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules'],
  },
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'assets/js/[name].js.map',
      exclude: ['vendor.bundle.js']
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // new HtmlWebpackPlugin({
    //   title: 'Home page',
    //   hash: true,
    //   // inject: true,
    //   chunks: ['app'],
    //   template: './src/index/index.html',
    //   filename: 'index.html'
    // }),
    new HtmlWebpackPlugin({
      title: 'Holding page',
      hash: true,
      // inject: true,
      chunks: ['holding'],
      template: './src/jekyll/_includes/themes/jmblog/theme/holding.html',
      filename: '_includes/themes/jmblog/theme/holding.html',
      'meta': {
        // 'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        // 'theme-color': '#4285f4'
        // Will generate: <meta name="theme-color" content="#4285f4">
        // 'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' },
        // Will generate: <meta http-equiv="Content-Security-Policy" content="default-src https:">
        // Which equals to the following http header: `Content-Security-Policy: default-src https:`
        // 'set-cookie': { 'http-equiv': 'set-cookie', content: 'name=value; expires=date; path=url' },
        // Will generate: <meta http-equiv="set-cookie" content="value; expires=date; path=url">
        // Which equals to the following http header: `set-cookie: value; expires=date; path=url`
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Error',
      hash: true,
      // inject: true,
      chunks: ['error'],
      template: './src/jekyll/_includes/themes/jmblog/theme/error.html',
      filename: '_includes/themes/jmblog/theme/error.html'
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg|woff|woff2)$/,
      compressionOptions: {
        // zlib’s `level` option matches Brotli’s `BROTLI_PARAM_QUALITY` option.
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to:'assets' },
        { from: 'src/jekyll' }
        // { from: 'other', to: 'public' },
      ],
      options: {
        concurrency: 100,
      },
    }),
    // new CompressionPlugin({
    //   test: /\.js(\?.*)?$/i,
    // }),
    
  ],
  // devServer: {
  //   contentBase: './_build',
  //   compress:true,
  //   port: 9000,
  //   host: '0.0.0.0',
  //   hot: true,
  //   open: true,
  //   inline: true,
  // },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', // create `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ]
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};