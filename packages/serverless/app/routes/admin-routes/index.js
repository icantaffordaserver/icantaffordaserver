import { Router } from 'express'

import adminSchemaExtensionRoutes from './adminSchemaExtensionRoutes'

const routes = Router()

routes.use('/schemaExtension', adminSchemaExtensionRoutes)

export default routes
