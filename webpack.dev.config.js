const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './examples/main.ts',
    foremanWorker: './examples/workers/foreman.worker.ts',
    taskAWorker: './examples/workers/taskA.worker.ts',
    taskBWorker: './examples/workers/taskB.worker.ts',
    taskCWorker: './examples/workers/taskC.worker.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: '/node_modules/'
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webworker-rpc",
      chunks: ['app']
    }),
  ],
  devServer: {
    writeToDisk: true,
    contentBase: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    host: '0.0.0.0',
    port: 8082,
    watchOptions: {
      poll: 1000
    },
    open: false
  },
};
