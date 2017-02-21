/**
 * Created by alexandermann on 2017-02-03.
 */
import { Router } from 'express';

import { resendVerificationEmailGet, verifySignUpGet } from './VerifyController';
import { ensureAuthenticated } from '../authenticationMiddleware';

const routes = Router();

/**
 * Verify Routes
 * /verify
 */
routes.get('/resend', ensureAuthenticated, resendVerificationEmailGet);
routes.get('/:token', ensureAuthenticated, verifySignUpGet);

export default routes;
