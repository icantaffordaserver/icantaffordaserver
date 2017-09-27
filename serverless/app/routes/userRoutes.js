import { Router } from 'express'

import { sendVerificationEmailHandler } from '../controllers/userControllers/user-subscription-controller'
import sendPasswordResetEmail from '../logic/createPasswordReset/async/sendPasswordResetEmail'

const routes = Router()

const createUser = () => console.log('hi')

// All microservice functions related to users type
routes.post('/requestPipeline', createUser)
routes.use('/schemaExtension', createUser)

routes.post('/subscription/sendVerificationEmail', sendVerificationEmailHandler)
routes.post('/subscription/sendPasswordResetEmail', sendPasswordResetEmail)

export default routes
