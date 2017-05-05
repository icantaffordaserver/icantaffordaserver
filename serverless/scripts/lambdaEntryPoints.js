/**
 * Created by alexandermann on 2017-05-05.
 */
const fs = require('fs')
const path = require('path')

// build an array of the function entry points given the project structure:
// - projectName/
// ---- src/
// ------ lambdaFolderName/
// ------ lambdaFolderName/
// ------ lambdaFolderName/
module.exports = function entryPoints() {
  // expect this script to be executed at the root dir (serverless/)
  console.log('entryPoints(): ', process.cwd())
  const cwd = process.cwd() + '/src'

  // return an array of the absolute paths to all lambda functions
  return fs
    .readdirSync(cwd)
    .filter(file => fs.statSync(path.join(cwd, file)).isDirectory())
    .map(dir => `${cwd}/${dir}`)
}
