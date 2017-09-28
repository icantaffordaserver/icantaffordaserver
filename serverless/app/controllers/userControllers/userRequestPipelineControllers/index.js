import { Router } from 'express'

import { handler1, handler2, handler3 } from './handlers'

const routes = Router()

// ROutes for /users/requestPipeline/[FUNCTION_NAME]
routes.use('/handler1', handler1)
routes.use('/handler2', handler2)
routes.use('/handler3', handler3)

export default routes
