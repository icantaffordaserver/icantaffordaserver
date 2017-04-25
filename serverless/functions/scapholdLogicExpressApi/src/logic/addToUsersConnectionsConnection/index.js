/**
 * Created by alexandermann on 2017-04-22.
 */
import { Router } from 'express';

import addUserToConnection from './async/addUserToConnection';

const routes = Router()

routes.post('/async/addUserToConnection', addUserToConnection)

export default routes
