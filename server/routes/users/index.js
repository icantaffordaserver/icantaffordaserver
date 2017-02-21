/**
 * Created by alexandermann on 2017-02-03.
 */
import { Router } from 'express';

import { allUsersGet, singleUserGet } from './UserController';

const routes = Router();

/**
 * Users Routes
 * /users
 */
routes.get('/', allUsersGet);
routes.get('/:userId', singleUserGet);

export default routes;
