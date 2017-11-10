import { Router } from 'express'

import sendInviteController from '../../controllers/invite-controllers/invite-schema-extension-controllers/sendInvite'

const routes = Router()

routes.post('/sendInvite', sendInviteController)

export default routes
