/**
 * Created by alexandermann on 2017-02-03.
 */
import { Router } from 'express';

import { signUpPost, inviteSignUpPost } from './SignUpController';
import { validateUserSignUp } from '../validationMiddleware';

const routes = Router();
/**
 * Route: /signup
 */
routes.post('/', validateUserSignUp, signUpPost); // Will be disabled during beta
routes.post('/invite/:inviteId', validateUserSignUp, inviteSignUpPost); // Accept an invite sent

export default routes;
