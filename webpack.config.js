const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    contentBase: './'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Stuart Frontend Challenge Master',
      favicon: './assets/dropOffBadgePresent.svg'
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?|\.tsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};