const path = require('path')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

module.exports = {
  entry: './app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}