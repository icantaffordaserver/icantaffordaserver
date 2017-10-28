import { Router } from 'express'

import sendBetaInviteController from '../../controllers/invite-controllers/invite-schema-extension-controllers/sendBetaInviteController'

const routes = Router()

routes.post('/sendBetaInvite', sendBetaInviteController)

export default routes
