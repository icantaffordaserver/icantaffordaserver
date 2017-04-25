/**
 * Created by alexandermann on 2017-04-22.
 */
import { Router } from 'express'

import isResendingInvite from './pre/isResendingInvite';

const routes = Router()

routes.post('/pre/isResendingInvite', isResendingInvite)

export default routes
