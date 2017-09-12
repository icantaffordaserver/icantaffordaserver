/**
 * Created by alexandermann on 2017-04-22.
 */
import { Router } from 'express'

import verifyEmail from './pre/verifyEmail'

const routes = Router()

routes.post('/pre/verifyEmail', verifyEmail)

export default routes
