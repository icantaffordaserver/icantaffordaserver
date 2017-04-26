/**
 * Created by alexandermann on 2017-04-26.
 */
import { Router } from 'express'

import createUser from './logic/createUser/index'
import updateUser from './logic/updateUser/index'
import createInvites from './logic/createInvites/index'
import updateInvites from './logic/updateInvites/index'
import createPasswordReset from './logic/createPasswordReset/index'
import updatePasswordReset from './logic/updatePasswordReset/index'
import createVerifyEmail from './logic/createVerifyEmail/index'
import addToUsersConnectionsConnection from './logic/addToUsersConnectionsConnection/index'

const routes = Router()

routes.get('/hello', (req, res) => {
  console.log(req)
  res.send('world')
})

// All microservice functions related to users type
routes.post('/createUser', createUser)
routes.post('/updateUser', updateUser)

// All microservice functions related to invites type
routes.post('/createInvites', createInvites)
routes.post('/updateInvites', updateInvites)

// All microservice functions related to PasswordReset type
routes.post('/createPasswordReset', createPasswordReset)
routes.post('/updatePasswordReset', updatePasswordReset)

// All microservice functions related to VerifyEmail type
routes.post('/createVerifyEmail', createVerifyEmail)

// All microservice functions related to Connection type
routes.post('/addToUsersConnectionsConnection', addToUsersConnectionsConnection)

export default routes
