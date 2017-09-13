import { Router } from 'express'

import createUser from './logic/createUser/index'
import updateUser from './logic/updateUser/index'

const routes = Router()

// All microservice functions related to users type
routes.use('/createUser', createUser)
routes.use('/updateUser', updateUser)

export default routes
