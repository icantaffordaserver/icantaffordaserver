/**
 * Created by alexandermann on 2017-03-26.
 */
// load the default config generator.
var genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = function(config, env) {
  // You can use your own config here as well, instead our default config.
  var config = genDefaultConfig(config, env);

  // this is used by our custom `rr.js` module
  config.resolve.alias['react-router-original'] = require.resolve('react-router-dom');
  // this `rr.js` will replace the Link with a our own mock component.
  config.resolve.alias['react-router-dom'] = require.resolve('./rr.js');
  return config;
};
