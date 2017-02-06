import { Router } from 'express';

import contactController from '../controllers/contact';
import accountRoutes from './account';
import signupRoutes from './signup';
import userRoutes from './users';
import requestRoutes from './request';
import invitesRoutes from './invites';
import connectionsRoutes from './connections';
import socialAuthRoutes from './socialauth';
import verifyRoutes from './verify';
import dashboardRoutes from './dashboard';

import { ensureAuthenticated } from './authenticationMiddleware';
import { loginPost, forgotPost, resetPost } from './IndexController';

// Validation Helpers
import {
  validateUserLogin,
  validateForgotPassword,
} from './validationMiddleware';

const routes = Router();

routes.use('/account', ensureAuthenticated, accountRoutes);
routes.use('/users', userRoutes);
routes.use('/request', requestRoutes);
routes.use('/invites', invitesRoutes);
routes.use('/connections', connectionsRoutes);
routes.use('/signup', signupRoutes);
routes.use('/auth', socialAuthRoutes);
routes.use('/verify', verifyRoutes);
routes.use('/dashboard', dashboardRoutes);

routes.post('/login', validateUserLogin, loginPost);

routes.post('/forgot', validateForgotPassword, forgotPost);

routes.post('/reset/:token', resetPost);

routes.post('/contact', contactController.contactPost);

export default routes;
