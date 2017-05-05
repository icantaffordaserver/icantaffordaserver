/**
 * Created by alexandermann on 2017-04-21.
 */
import path from 'path'
import nodeExternals from 'webpack-node-externals'

// add source maps and unhandledException/Promise catchers to all lambdas
const sourceMapsAndUnhandledErrors = path.join(__dirname, './webpackInclude.js')

// webpack is run relative to each function root
export default {
  entry: [sourceMapsAndUnhandledErrors, path.join(process.cwd(), 'src/index.js')],
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), 'lib'),
    filename: 'index.js',
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
