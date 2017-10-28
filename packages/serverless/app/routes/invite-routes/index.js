import { Router } from 'express'

import inviteSchemaExtensionRoutes from './inviteSchemaExtensionRoutes'

const routes = Router()

// All microservice functions related to users type
//routes.use('/requestPipeline', userRequestPipelineControllers)
routes.use('/schemaExtension', inviteSchemaExtensionRoutes)

export default routes
