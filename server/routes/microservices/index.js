/**
 * Created by alexandermann on 2017-03-26.
 */
import { Router } from 'express';

import createUser from '../../microservices/scaphold/logic/createUser/pre/validateInputAndCreateEmailVerifyToken';
import generateToken from '../../microservices/scaphold/logic/createVerifyEmail/pre/generateToken';
import createVerifyEmailSendEmail from '../../microservices/scaphold/logic/createVerifyEmail/async/sendVerificationEmailAfterCreateVerifyEmail';
import createPasswordReset from '../../microservices/scaphold/logic/createPasswordReset/createPasswordReset';
import sendPasswordResetEmail from '../../microservices/scaphold/logic/createPasswordReset/sendPasswordResetEmail';
import updatePasswordReset from '../../microservices/scaphold/logic/updatePasswordReset/updatePasswordReset';
import deletePasswordReset from '../../microservices/scaphold/logic/updatePasswordReset/deletePasswordReset';
import createTypeformProfile from '../../microservices/typeform/createTypeformProfile';
import sendVerificationEmail from '../../microservices/scaphold/logic/createUser/async/sendVerificationEmailAfterCreateUser';
import verifyEmail from '../../microservices/scaphold/logic/updateUser/verifyEmail';
import validateInviteAndCreateInviteToken from '../../microservices/scaphold/logic/createInvites/pre/validateInviteAndCreateInviteToken';
import sendInviteEmail from '../../microservices/scaphold/logic/createInvites/async/sendInviteEmail';
import webflowInviteRequest from '../../microservices/webhooks/webflowInviteRequest';

const routes = Router();

/**
 * Microservices Routes
 * /microservices
 */
// createUser Logic
routes.post('/createUser', createUser);
routes.post('/sendVerificationEmailAfterCreateUser', sendVerificationEmail);

// createInvites Logic
routes.post('/createInvites', validateInviteAndCreateInviteToken);
routes.post('/sendInviteEmail', sendInviteEmail);

// accept webflow form webhook for invite request
routes.post('/inviterequest', webflowInviteRequest);

routes.post('/generateToken', generateToken);
routes.post('/createVerifyEmailSendEmail', createVerifyEmailSendEmail);
routes.post('/createPasswordReset', createPasswordReset);
routes.post('/updatePasswordReset', updatePasswordReset);
routes.post('/deletePasswordReset', deletePasswordReset);
routes.post('/createTypeformProfile', createTypeformProfile);
routes.post('/sendPasswordResetEmail', sendPasswordResetEmail);
routes.post('/verifyEmail', verifyEmail);

export default routes;
