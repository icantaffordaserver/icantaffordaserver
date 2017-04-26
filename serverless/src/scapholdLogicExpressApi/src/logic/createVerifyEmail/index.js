/**
 * Created by alexandermann on 2017-04-22.
 */
import { Router } from 'express'

import generateToken from './pre/generateToken'
import sendVerificationEmailAfterCreateVerifyEmail
  from './async/sendVerificationEmailAfterCreateVerifyEmail'

const routes = Router()

routes.post('/pre/generateToken', generateToken)
routes.post(
  '/async/sendVerificationEmailAfterCreateVerifyEmail',
  sendVerificationEmailAfterCreateVerifyEmail,
)

export default routes
