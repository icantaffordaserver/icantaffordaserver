/**
 * Created by alexandermann on 2017-02-03.
 */
import { Router } from 'express';
import { accountPut, accountDelete } from './AccountController';
import { validateUpdateAccount } from '../validationMiddleware';

const routes = Router();

/**
 * Route: /account
 */
routes.put('/', validateUpdateAccount, accountPut);
routes.delete('/', accountDelete);

export default routes;
