var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/static',
  },
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jpe?g$/,
        use: 'url-loader',
      },
      {
        test: /\.(ttf|otf|svg|png|gif)$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost',
      },
    },
  },
}
