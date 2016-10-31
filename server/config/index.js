/**
 * Created by AlexanderMann on 2016-10-26.
 */
var Nconf = require('nconf'),
    nconf = new Nconf.Provider(),
    path = require('path'),
    env = process.env.NODE_ENV || 'development';

/**
 * Hierarchical configuration START
 */

/**
 * 1. command line arguments
 */
nconf.argv();

/**
 * 2. env arguments
 */
nconf.env({
    separator: '__'
});

/**
 * load config files
 * @TODO:
 * - why does this work? i have no idea!
 * - find out why argv override works, when defining these weird keys
 * - i could not find any nconf usages so that all config requirements work
 */

/**
 * 3. overrides arguments
 */
nconf.file('ghost1', __dirname + '/overrides.json'); // always be this value

/**
 * 4. values in below directories
 */
nconf.file('ghost2', path.join(process.cwd(), 'config.' + env + '.json'));
nconf.file('ghost3', __dirname + '/env/config.' + env + '.json');

/**
 * 5. any default values
 */
nconf.file('ghost4', __dirname + '/defaults.json');

/**
 * Hierarchical configuration END
 */

/**
 * values we have to set manual
 */
nconf.set('env', env);

module.exports = nconf;