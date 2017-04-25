/**
 * Created by alexandermann on 2017-04-22.
 */
import { Router } from 'express'

import validateInputAndCreateEmailVerifyToken from './pre/validateInputAndCreateEmailVerifyToken'
import isInviteApproved from './post/isInviteApproved'
import sendVerificationEmailAfterCreateUser from './async/sendVerificationEmailAfterCreateUser'

const routes = Router()

routes.post('/pre/validateInputAndCreateEmailVerifyToken', validateInputAndCreateEmailVerifyToken)
routes.post('/post/isInviteApproved', isInviteApproved)
routes.post('/async/sendVerificationEmailAfterCreateUser', sendVerificationEmailAfterCreateUser)

export default routes
