import { Router } from 'express'

import sendVerificationEmail from '../../controllers/user-controllers/user-subscription-controllers/sendVerificationEmail'
import sendPasswordResetEmail from '../../controllers/user-controllers/user-subscription-controllers/sendPasswordResetEmail'
import setPasswordResetComplete from '../../controllers/user-controllers/user-subscription-controllers/setPasswordResetComplete'

const routes = Router()

// Routes for /users/subscription/[FUNCTION_NAME]
routes.post('/sendVerificationEmail', sendVerificationEmail)
routes.post('/sendPasswordResetEmail', sendPasswordResetEmail)
routes.post('/setPasswordResetComplete', setPasswordResetComplete)

export default routes
