const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: './dist',
        open: true,
    },
    module: {
        rules: [
          {
              test: /\.css$/i,
              use: [
                'style-loader',
                'css-loader'
              ],
          },
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env'],
                  },
              },
          },
          {
              test: /\.(png|svg|jpg|jpeg|scg|gif)$/i,
              type: 'asset/resource',
          }
        ],
    },
    plugins: [
       new HtmlWebpackPlugin({
        title: 'Webpack App',
        template: 'src/index.html',
       }),
    ],
}