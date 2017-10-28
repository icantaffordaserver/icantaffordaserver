import { Router } from 'express'

import userSubscriptionRoutes from './userSubscriptionRoutes'
import userSchemaExtensionRoutes from './userSchemaExtensionRoutes'
import getToken from '../../helpers/twilio'

const routes = Router()

// All microservice functions related to users type
//routes.use('/requestPipeline', userRequestPipelineControllers)
routes.use('/schemaExtension', userSchemaExtensionRoutes)
routes.use('/subscription', userSubscriptionRoutes)
routes.post('/token', getToken)

export default routes
