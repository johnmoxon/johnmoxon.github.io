const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index/js/index.js',
    // holding: './src/holding-page/index.js',
    // vendor: './src/index/js/vendor.js'
  },
  resolve: {
    modules: ['node_modules'],
  },
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      // exclude: ['vendor.bundle.js']
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'Home page',
      hash: true,
      template: './src/index/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Holding page',
      hash: true,
      template: './src/holding-page/index.html',
      filename: 'holding.html',
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
    new CopyPlugin({
      patterns: [
        { from: 'src/assets' },
        // { from: 'other', to: 'public' },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  devServer: {
    contentBase: './dist',
    compress:true,
    port: 9000,
    host: '0.0.0.0',
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.s[sc]ss$/i,
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
  // plugins:[
  // ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};