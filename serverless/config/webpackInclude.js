/**
 * Created by alexandermann on 2017-05-04.
 */
// Catch all unhandled exceptions and print their stack trace.
// Required if the hanlder function is async, as promises
// can swallow error messages.

process.on('uncaughtException', err => console.error('uncaught exception:', err))
process.on('unhandledRejection', error => console.error('unhandled rejection:', error))
