/**
 * Created by alexandermann on 2017-04-22.
 */
import { Router } from 'express'

import createPasswordReset from './pre/createPasswordReset'
import sendPasswordResetEmail from './async/sendPasswordResetEmail'

const routes = Router()

routes.post('/pre/createPasswordReset', createPasswordReset)
routes.post('/async/sendPasswordResetEmail', sendPasswordResetEmail)

export default routes
