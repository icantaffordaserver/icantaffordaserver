/**
 * Created by alexandermann on 2017-04-21.
 */
import path from 'path'
import Webpack from 'webpack'

// NOTE: paths are relative to each functions folder
export default {
  entry: './src/index.js',
  target: 'node',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(process.cwd(), 'lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          // presets: ['babili'],
          // cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new Webpack.NoEmitOnErrorsPlugin(),
    // new Webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production'),
    //   },
    // }),
    // new Webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),
    // new Webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   output: { comments: false },
    //   sourceMaps: true,
    // }),
  ],
}
