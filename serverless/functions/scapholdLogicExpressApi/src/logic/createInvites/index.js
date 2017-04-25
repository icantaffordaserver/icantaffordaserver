/**
 * Created by alexandermann on 2017-04-22.
 */
import { Router } from 'express'

import validateInviteAndCreateInviteToken from './pre/validateInviteAndCreateInviteToken'
import sendInviteEmail from './async/sendInviteEmail'

const routes = Router()

routes.post('/pre/validateInviteAndCreateInviteToken', validateInviteAndCreateInviteToken)
routes.post('/async/sendInviteEmail', sendInviteEmail)

export default routes
