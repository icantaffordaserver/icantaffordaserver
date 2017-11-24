import { Router } from 'express'

import sendVerificationEmail from '../../controllers/user-controllers/user-subscription-controllers/sendVerificationEmail'
import sendPasswordResetEmail from '../../controllers/user-controllers/user-subscription-controllers/sendPasswordResetEmail'
import setPasswordResetComplete from '../../controllers/user-controllers/user-subscription-controllers/setPasswordResetComplete'
import moveConnectionToScheduled from '../../controllers/user-controllers/user-subscription-controllers/moveConnectionToScheduled'
import createConnectionSuggestions from '../../controllers/user-controllers/user-subscription-controllers/createConnectionSuggestions'

const routes = Router()

// Routes for /users/subscription/[FUNCTION_NAME]
routes.post('/sendVerificationEmail', sendVerificationEmail)
routes.post('/sendPasswordResetEmail', sendPasswordResetEmail)
routes.post('/setPasswordResetComplete', setPasswordResetComplete)
routes.post('/moveConnectionToScheduled', moveConnectionToScheduled)
routes.post('/createConnectionSuggestions', createConnectionSuggestions)

export default routes
