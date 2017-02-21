/**
 * Created by alexandermann on 2017-02-03.
 */
import { Router } from 'express';
import { authFacebook, authFacebookCallback, unlink } from './SocialAuthController';
import { ensureAuthenticated } from '../authenticationMiddleware';

const routes = Router();

routes.post('/facebook', authFacebook);
routes.get('/facebook/callback', authFacebookCallback);
routes.get('/unlink/:provider', ensureAuthenticated, unlink);

export default routes;