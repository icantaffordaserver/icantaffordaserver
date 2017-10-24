/**
 * Created by alexandermann on 2017-04-22.
 */
import { Router } from 'express'

import sendVerificationEmailAfterCreateVerifyEmail from './async/sendVerificationEmailAfterCreateVerifyEmail'

const routes = Router()

routes.post(
  '/async/sendVerificationEmailAfterCreateVerifyEmail',
  sendVerificationEmailAfterCreateVerifyEmail,
)

export default routes
