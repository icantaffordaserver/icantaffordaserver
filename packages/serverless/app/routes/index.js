/**
 * Created by alexandermann on 2017-04-26.
 */
import { Router } from 'express'
import seed from '../utils/seed'

import userRoutes from './user-routes'
import inviteRoutes from './invite-routes'

const routes = Router()

routes.get('/health', (req, res) => res.send({ message: 'All good' }))
routes.get('/seed', seed)

// All microservice functions related to user type
routes.use('/user', userRoutes)
routes.use('/invite', inviteRoutes)

// All microservice functions related to invites type
// routes.use('/createInvites', createInvites)
// routes.use('/updateInvites', updateInvites)

// All microservice functions related to PasswordReset type
// routes.use('/createPasswordReset', createPasswordReset)
// routes.use('/updatePasswordReset', updatePasswordReset)

// routes.post('/token', getToken)

// All microservice functions related to Connection type
// routes.use('/addToUsersConnectionsConnection', addToUsersConnectionsConnection)

export default routes
