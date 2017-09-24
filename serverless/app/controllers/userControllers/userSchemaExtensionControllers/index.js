import { Router } from 'express'

import {
  triggerPasswordReset,
  signUpUser,
  authenticateUser,
  updatePassword,
  sendBetaInvite,
} from './handlers'

const routes = Router()

// ROutes for /users/schemaExtension/[FUNCTION_NAME]
routes.post('/triggerPasswordReset', triggerPasswordReset)
routes.post('/signUpUser', signUpUser)
routes.post('/authenticateUser', authenticateUser)
routes.post('/updatePassword', updatePassword)
routes.post('/sendBetaInvite', sendBetaInvite)

export default routes
