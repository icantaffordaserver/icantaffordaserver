const routes = require('express').Router();

// Controllers
const userController    = require('../controllers/user');
const contactController = require('../controllers/contact');
import {
    resendInviteGet,
    allInvitesGet,
    newInvitePost,
    inviteDelete,
    updateInvitePut
} from '../controllers/invites';
import {
    allConnectionsGet,
    newConnectionPost,
    connectionGet,
    updateConnectionPut,
    connectionDelete
} from '../controllers/connections';

routes.post('/contact', contactController.contactPost);

routes.put('/account', userController.ensureAuthenticated, userController.accountPut);
routes.delete('/account', userController.ensureAuthenticated, userController.accountDelete);

routes.get('/users', userController.allUsersGet);
routes.get('/users/:token/verify', userController.ensureAuthenticated, userController.verifySignUpGet);

routes.post('/signup', userController.signupPost);

// Accept an invite sent
routes.post('/signup/invite/:inviteId', userController.inviteSignUpPost);

routes.post('/login', userController.loginPost);

routes.post('/forgot', userController.forgotPost);

routes.post('/reset/:token', userController.resetPost);

routes.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);

routes.post('/auth/facebook', userController.authFacebook);
routes.get('/auth/facebook/callback', userController.authFacebookCallback);

/**
 * Invite Routes
 */

routes.get('/invites', allInvitesGet); // get all invites
routes.get('/invites/:inviteId/resend', resendInviteGet); // resend an invite
routes.post('/invites', newInvitePost); // create an invite
routes.put('/invites/:id', updateInvitePut); // update an email, first name, last name, or sent by user id column, can also resend the invite
routes.delete('/invites/:id', inviteDelete); // delete an invite

/**
 * Connections Routes
 */
routes.get('/connections', allConnectionsGet);
routes.get('/connections/:id', connectionGet);
routes.post('/connections', newConnectionPost);
routes.put('/connections/:id', updateConnectionPut);
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

export default routes;