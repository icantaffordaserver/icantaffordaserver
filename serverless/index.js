/**
 * Created by alexandermann on 2017-04-10.
 */

// After an admin "creates a connection" within scaphold, we need to add both users to the
// connection. This is when we will send them emails to inform them that hey have a connection
// scheduled and what time it is at
exports.addUserToConnection = require('./scaphold/logic/addToUsersConnectionsConnection/async/addUserToConnection')

exports.validateAndCreateInviteToken = require('./scaphold/logic/createInvites/pre/validateInviteAndCreateInviteToken')

// ******createUser Logic
// routes.post('/createUser', createUser);
// routes.post('/sendVerificationEmailAfterCreateUser', sendVerificationEmail);
// routes.post('/isInviteApproved', isInviteApproved);
//
// ******createInvites Logic
// routes.post('/createInvites', validateInviteAndCreateInviteToken); *** DONE
// routes.post('/sendInviteEmail', sendInviteEmail);
//
// ******updateInvites Logic
// routes.post('/isResendingInvite', isResendingInvite);
//
// ******accept webflow form webhook for invite request
// routes.post('/inviterequest', webflowInviteRequest);
//
// routes.post('/generateToken', generateToken);
// routes.post('/createVerifyEmailSendEmail', createVerifyEmailSendEmail);
// routes.post('/createPasswordReset', createPasswordReset);
// routes.post('/updatePasswordReset', updatePasswordReset);
// routes.post('/deletePasswordReset', deletePasswordReset);
// routes.post('/createTypeformProfile', createTypeformProfile);
// routes.post('/sendPasswordResetEmail', sendPasswordResetEmail);
// routes.post('/verifyEmail', verifyEmail);
