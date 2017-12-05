import { Router } from 'express'

import userSubscriptionRoutes from './userSubscriptionRoutes'
import userSchemaExtensionRoutes from './userSchemaExtensionRoutes'

const routes = Router()

// All microservice functions related to users type
//routes.use('/requestPipeline', userRequestPipelineControllers)
routes.use('/schemaExtension', userSchemaExtensionRoutes)
routes.use('/subscription', userSubscriptionRoutes)

export default routes
