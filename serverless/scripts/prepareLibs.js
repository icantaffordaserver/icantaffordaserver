/**
 * Created by alexandermann on 2017-05-06.
 */
const shell = require('shelljs')

// iterate over all local libraries and install their deps and build their
// package so that when lambda functions install them all files and folders
// are in place

// Basically need to make sure that this gets run before bundleLambdas script

// TODO: iterate over folders in libs and yarn install then build them
shell.echo('Preparing libraries')
shell.cd('libs/mailer')
shell.exec('yarn install')
shell.exec('yarn run build')

shell.cd('../graphql-fetch')
shell.exec('yarn install')
shell.exec('yarn run build')
