const routes = require('express').Router();

// Controllers
const contactController = require('../controllers/contact');
import {
  ensureAuthenticated,
  accountPut,
  accountDelete,
  allUsersGet,
  singleUserGet,
  verifySignUpGet,
  signUpPost,
  inviteSignUpPost,
  loginPost,
  forgotPost,
  resetPost,
  unlink,
  authFacebook,
  authFacebookCallback,
} from '../controllers/userController';
import {
  resendInviteGet,
  allInvitesGet,
  inviteGet,
  newInvitePost,
  inviteDelete,
  updateInvitePut,
} from '../controllers/invites';
import {
  allInviteRequestsGet,
  newInviteRequestPost,
  approveInviteRequestPost,
  inviteRequestDelete,
} from '../controllers/inviteRequestsController';
import {
  allConnectionsGet,
  newConnectionPost,
  singleConnectionGet,
  updateConnectionPut,
  connectionDelete,
} from '../controllers/connections';

// Validation Helpers
import {
  validateUserSignUp,
  validateUserLogin,
  validateUpdateAccount,
  validateForgotPassword,
  validateNewInvite,
} from './validationMiddleware';

routes.post('/contact', contactController.contactPost);

routes.put('/account', ensureAuthenticated, validateUpdateAccount, accountPut);
routes.delete('/account', ensureAuthenticated, accountDelete);

routes.get('/users', allUsersGet);
routes.get('/users/:userId', singleUserGet);
routes.get('/users/:token/verify', ensureAuthenticated, verifySignUpGet);

routes.post('/signup', validateUserSignUp, signUpPost); // Will be disabled during beta
routes.post('/signup/invite/:inviteId', validateUserSignUp, inviteSignUpPost); // Accept an invite sent

routes.post('/login', validateUserLogin, loginPost);

routes.post('/forgot', validateForgotPassword, forgotPost);

routes.post('/reset/:token', resetPost);

routes.get('/unlink/:provider', ensureAuthenticated, unlink);

routes.post('/auth/facebook', authFacebook);
routes.get('/auth/facebook/callback', authFacebookCallback);

/**
 * Invite Routes
 */

routes.get('/invites', allInvitesGet); // get all invites
routes.get('/invites/:inviteId', inviteGet); // get all invites
routes.get('/invites/:inviteId/resend', resendInviteGet); // resend an invite
routes.post('/invites', validateNewInvite, newInvitePost); // create an invite
routes.put('/invites/:id', updateInvitePut); // update an email, first name, last name, or sent by user id column, can also resend the invite
routes.delete('/invites/:id', inviteDelete); // delete an invite

/**
 * Connections Routes
 */
routes.get('/connections', allConnectionsGet);
routes.get('/connections/:id', singleConnectionGet);
routes.post('/connections', newConnectionPost);
routes.put('/connections/:connectionId', updateConnectionPut);
routes.delete('/connections/:id', connectionDelete);

/**
 * Connection Progress Routes
 */
// TODO: wire up these routes and configure webhooks
routes.get('/connections/progress');
routes.get('/connections/progress');
routes.post('/connections/progress');
routes.put('/connections/progress');
routes.delete('/connections/progress');

/**
 * Request Invite Routes
 */
routes.get('/request', allInviteRequestsGet);
routes.post('/request', newInviteRequestPost);
routes.post('/request/approve', approveInviteRequestPost);
routes.delete('/request/:inviteRequestId', inviteRequestDelete);

export default routes;
