const path = require('path')

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/index.js'],
    edit: ['babel-polyfill', './src/edit.js']
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader', // inject styles into DOM
        'css-loader', // copiles css into js
        'sass-loader' // compiles sass into css
      ]
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/'
  },
  devtool: 'source-map'
}