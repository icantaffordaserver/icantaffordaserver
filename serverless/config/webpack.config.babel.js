/**
 * Created by alexandermann on 2017-04-21.
 */
import path from 'path'
import nodeExternals from 'webpack-node-externals'

import {entryPoints, outputDirs} from '../scripts/lambdaEntryPoints';
const entryPoints = getEntryPoints()
const outputs = outputDirs()

// NOTE: current approach does not work - write a custom build script that calls
// webpack in every lambda root dir and do what apex does - loop webpack and call
// relative to function dir
export default {
  entry: entryPoints,
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd() + '/src/scapholdLogicExpressApi/lib'),
    filename: 'scapholdApi.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
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
