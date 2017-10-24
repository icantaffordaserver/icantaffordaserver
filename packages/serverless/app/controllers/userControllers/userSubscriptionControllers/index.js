import { Router } from 'express'

import sendVerificationEmail from './handlers/sendVerificationEmail'
import sendPasswordResetEmail from './handlers/sendPasswordResetEmail'
import setPasswordResetComplete from './handlers/setPasswordResetComplete'

const routes = Router()

// Routes for /users/subscription/[FUNCTION_NAME]
routes.post('/sendVerificationEmail', sendVerificationEmail)
routes.post('/sendPasswordResetEmail', sendPasswordResetEmail)
routes.post('/setPasswordResetComplete', setPasswordResetComplete)

export default routes
