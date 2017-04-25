/**
 * Created by alexandermann on 2017-04-22.
 */
import express from 'express'

import createUser from './logic/createUser'
import updateUser from './logic/updateUser'
import createInvites from './logic/createInvites'
import updateInvites from './logic/updateInvites'
import createPasswordReset from './logic/createPasswordReset'
import updatePasswordReset from './logic/updatePasswordReset'
import createVerifyEmail from './logic/createVerifyEmail'
import addToUsersConnectionsConnection from './logic/addToUsersConnectionsConnection'

const app = express()

app.get('/hello', (req, res) => {
  console.log(req)
  res.send('world')
})

// All microservice functions related to users type
app.post('/createUser', createUser)
app.post('/updateUser', updateUser)

// All microservice functions related to invites type
app.post('/createInvites', createInvites)
app.post('/updateInvites', updateInvites)

// All microservice functions related to PasswordReset type
app.post('/createPasswordReset', createPasswordReset)
app.post('/updatePasswordReset', updatePasswordReset)

// All microservice functions related to VerifyEmail type
app.post('/createVerifyEmail', createVerifyEmail)

// All microservice functions related to Connection type
app.post('/addToUsersConnectionsConnection', addToUsersConnectionsConnection)

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
    error: err,
  })
})

app.listen(8001)

export default app
