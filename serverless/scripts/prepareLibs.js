/**
 * Created by alexandermann on 2017-05-06.
 */
const shell = require('shelljs')

// TODO: iterate over folders in libs and yarn install then build them
shell.echo('Preparing libraries')
shell.cd('libs/mailer')
shell.exec('yarn install')
shell.exec('yarn run build')

shell.cd('../graphql-fetch')
shell.exec('yarn install')
shell.exec('yarn run build')
