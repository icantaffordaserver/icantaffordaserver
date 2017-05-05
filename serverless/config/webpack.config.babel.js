/**
 * Created by alexandermann on 2017-04-21.
 */
import path from 'path'
import nodeExternals from 'webpack-node-externals'

const sourceMapsUnhandledErrors = process.cwd() + '/config/webpackInclude'

export default {
  entry: [sourceMapsUnhandledErrors, process.cwd() + '/src/scapholdLogicExpressApi/src/index.js'],
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd() + 'src', 'scapholdLogicExpressApi', 'lib'),
    filename: 'scapholdApi.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
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
