import { Router } from 'express'

import authenticateUser from '../../controllers/user-controllers/user-schema-extension-controllers/authenticateUser'
import signUpUser from '../../controllers/user-controllers/user-schema-extension-controllers/signUpUser'
import updatePassword from '../../controllers/user-controllers/user-schema-extension-controllers/updatePassword'
import triggerPasswordReset from '../../controllers/user-controllers/user-schema-extension-controllers/triggerPasswordReset'

const routes = Router()

// ROutes for /users/schemaExtension/[FUNCTION_NAME]
routes.post('/triggerPasswordReset', triggerPasswordReset)
routes.post('/signUpUser', signUpUser)
routes.post('/authenticateUser', authenticateUser)
routes.post('/updatePassword', updatePassword)

export default routes
