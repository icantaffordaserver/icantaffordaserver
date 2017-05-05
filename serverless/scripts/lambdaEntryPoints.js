/**
 * Created by alexandermann on 2017-05-05.
 */
import fs from 'fs'
import path from 'path'

export function entryPoints() {
  const cwd = process.cwd() + '/src'
  const entries = {}
  const sourceMapsAndUnhandledErrors = process.cwd() + '/config/webpackInclude' // add sourcemaps and unhandledException/Promise catchers to all lambdas
  const lambdaNames = fs
    .readdirSync(cwd)
    .filter(file => fs.statSync(path.join(cwd, file)).isDirectory())

  for (let lambda of lambdaNames) {
    entries[lambda] = [sourceMapsAndUnhandledErrors, `${cwd}/${lambda}/src/index.js`]
  }
  return entries
}

export function outputDirs() {
  const cwd = process.cwd() + '/src'
  const outputs = {}
  const lambdaNames = fs
    .readdirSync(cwd)
    .filter(file => fs.statSync(path.join(cwd, file)).isDirectory())

  for (let lambda of lambdaNames) {
    outputs[lambda] = `${cwd}/${lambda}/lib`
  }
  return outputs
}
