/**
 * Created by alexandermann on 2017-04-22.
 */
// note that if this were a library/tool we should use transform runtime so that we don't pollute
// the global object/scope
import 'babel-polyfill'
import express from 'express'
import routes from './routes'

const app = express()

// set base url to 'scaphold' here as this is the base route we use in the serverless.yml config
app.use('/scaphold', routes)

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err,
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: {},
  })
})

export default app
