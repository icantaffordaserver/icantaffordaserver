/**
 * Created by alexandermann on 2017-04-22.
 */

'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'

import routes from './routes'

// make sure to export the app
const app = (module.exports = express())

app.use(awsServerlessExpressMiddleware.eventContext())
app.use(bodyParser.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev', { stream: logger.stream }))
}

app.use('/', routes)

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'dev') {
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
if (app.get('env') === 'prod' || app.get('env') === 'prod') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: {},
    })
  })
}
