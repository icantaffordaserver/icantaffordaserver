import { Router } from 'express'

import { sendVerificationEmailHandler } from '../controllers/userControllers/user-subscription-controller'

const routes = Router()

const createUser = () => console.log('hi')

// All microservice functions related to users type
routes.post('/requestPipeline', createUser)
routes.use('/schemaExtension', createUser)

routes.post('/subscription/sendVerificationEmail', sendVerificationEmailHandler)

export default routes
