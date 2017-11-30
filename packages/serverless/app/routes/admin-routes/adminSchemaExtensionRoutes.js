import { Router } from 'express'

import matchUsers from '../../controllers/admin-controllers/admin-schema-extension-controllers/matchUsers'

const routes = Router()

routes.post('/matchUsers', matchUsers)

export default routes
