/**
 * Created by alexandermann on 2017-05-05.
 */
const shell = require('shelljs')
const entryPoints = require('./lambdaEntryPoints')

const lambdas = entryPoints() // get all lambda paths

lambdas.forEach(lambdaDir => { // execute webpack on every lambda function
  const lambdaName = lambdaDir.split('/').pop()
  shell.echo(`Bundling ${lambdaName}`)
  shell.cd(lambdaDir)
  shell.exec('../../node_modules/.bin/babel-node ../../scripts/runWebpack.js')
})
