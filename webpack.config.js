const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

const config = {
  devServer: {
    compress: true,
    port: 4000,
    open: false
  },
  mode: 'none',
  entry: './index.js',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        include: /src/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg|mp4)$/i,
        use: ['url-loader'],
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html'
    })
  ]
}
module.exports = config
