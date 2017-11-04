import { Router } from 'express'

import inviteSchemaExtensionRoutes from './inviteSchemaExtensionRoutes'
import inviteSubscriptionRoutes from './inviteSubscriptionRoutes'

const routes = Router()

// All microservice functions related to users type
//routes.use('/requestPipeline', userRequestPipelineControllers)
routes.use('/schemaExtension', inviteSchemaExtensionRoutes)
routes.use('/subscription', inviteSubscriptionRoutes)

export default routes
