/**
 * Created by alexandermann on 2017-04-26.
 */
import { Router } from 'express'

import userRoutes from './userRoutes'

// import createInvites from './logic/createInvites/index'
// import updateInvites from './logic/updateInvites/index'
// import createPasswordReset from './logic/createPasswordReset/index'
// import updatePasswordReset from './logic/updatePasswordReset/index'
import createVerifyEmail from '../logic/createVerifyEmail/index'
// import addToUsersConnectionsConnection from './logic/addToUsersConnectionsConnection/index'

const routes = Router()

// All microservice functions related to user type
routes.use('/user', userRoutes)

// All microservice functions related to invites type
// routes.use('/createInvites', createInvites)
// routes.use('/updateInvites', updateInvites)

// All microservice functions related to PasswordReset type
// routes.use('/createPasswordReset', createPasswordReset)
// routes.use('/updatePasswordReset', updatePasswordReset)

// All microservice functions related to VerifyEmail type
routes.use('/createVerifyEmail', createVerifyEmail)

// All microservice functions related to Connection type
// routes.use('/addToUsersConnectionsConnection', addToUsersConnectionsConnection)

export default routes
