import { Router } from 'express'

import userSubscriptionControllers from '../controllers/userControllers/userSubscriptionControllers'
import userSchemaExtensionControllers from '../controllers/userControllers/userSchemaExtensionControllers'
import getToken from '../helpers/twilio'

const routes = Router()

// All microservice functions related to users type
//routes.use('/requestPipeline', userRequestPipelineControllers)
routes.use('/schemaExtension', userSchemaExtensionControllers)
routes.use('/subscription', userSubscriptionControllers)
routes.post('/token', getToken)

export default routes
