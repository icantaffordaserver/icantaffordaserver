/**
 * Created by alexandermann on 2017-05-05.
 */

import webpack from 'webpack'

import config from '../config/webpack.config.babel'

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log('Errors occurred: ')
    console.error(err)
    console.error(stats.toJson('errors-only'))
  }
  console.log('Done.')
})
