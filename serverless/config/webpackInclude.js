/**
 * Created by alexandermann on 2017-05-04.
 */
// Add source map support for proper stack traces
require('source-map-support').install()

// Catch all unhandled exceptions and print their stack trace.
// Required if the hanlder function is async, as promises
// can swallow error messages.

process.on('uncaughtException', err => {
  console.error('uncaught exception:', err)
  exit()
})
process.on('unhandledRejection', error => {
  console.error('unhandled rejection:', error)
  exit()
})

// this gets hoisted
// exit function for unhandled exception/rejection
function exit() {
  process.exit(1)
}
