/**
 * Created by alexandermann on 2017-04-22.
 */
import { Router } from 'express'

import updatePasswordReset from './pre/updatePasswordReset'

const routes = Router()

routes.post('/pre/updatePasswordReset', updatePasswordReset)

export default routes
