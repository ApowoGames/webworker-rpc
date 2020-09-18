const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './examples/main.ts',
    helperWorker: './src/helper.worker.ts',
    foremanWorker: './examples/workers/foreman.worker.ts',
    taskAWorker: './examples/workers/taskA.worker.ts',
    taskBWorker: './examples/workers/taskB.worker.ts',
    taskCWorker: './examples/workers/taskC.worker.ts',
  },
  module: {
    rules: [
      // {
      //   test: /\.worker\.ts$/,
      //   loader: 'worker-loader',
      //   options: { publicPath: '/dist/workers/' },
      // },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: '/node_modules/'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webworker-rpc",
      chunks: ['app']
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
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