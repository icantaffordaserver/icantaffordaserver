/**
 * Created by alexandermann on 2017-02-03.
 */
import { UserAccounts } from '../../models/UserAccounts';
import { generateUniqueToken } from '../../models/helpers';
import { sendVerificationEmail } from '../utils';
/**
 * GET /users/:token/verify TODO /verify/:token
 * Confirm sign up email address
 */
export async function verifySignUpGet(req, res, next) {
  const user = await new UserAccounts({ id: req.user.id }).fetch();
  if (req.user.email_verified) {
    res.send({ msg: 'Your account is already verified.' });
  } else if (req.user.email_verified_token === req.params.token) {
    await user.save({ email_verified: true }, { patch: true });
    res.send({ msg: 'Your account is now verified.' });
  } else {
    res.send({ msg: 'We could not verify your account at this time, please make sure you are logged in and try again.' });
  }
}

/**
 * GET /users/resendVerificationEmailGet TODO /verify/resend
 */
export async function resendVerificationEmailGet(req, res, next) {
  // 1. Get user id from jwt token
  const user = req.user;
  // 2. generate a new email token
  const newToken = await generateUniqueToken();
  try {
    // 3. save token to db
    await new UserAccounts({ id: user.id }).save({ email_verified_token: newToken }, { patch: true });
    // 4. send email
    const savedUser = await new UserAccounts({ id: user.id }).fetch({ withRelated: 'profile' });
    const { email, email_verified_token: token, profile: { first_name: firstName } } = savedUser.toJSON();
    await sendVerificationEmail(firstName, email, req.headers.host, token);
    res.status(200).send({
      status: 'success',
      msg: 'Verification email has been resent successfully.',
    });
  } catch (err) {
    console.log('Message unable to send!', err);
    res.status(400).send({
      msg: 'An error occurred.',
    });
  }
}
