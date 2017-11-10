import { Router } from 'express'

import createAndSendInviteEmail from '../../controllers/invite-controllers/invite-subscription-controllers/createAndSendInviteEmail'

const routes = Router()

routes.post('/createAndSendInviteEmail', createAndSendInviteEmail)

export default routes
