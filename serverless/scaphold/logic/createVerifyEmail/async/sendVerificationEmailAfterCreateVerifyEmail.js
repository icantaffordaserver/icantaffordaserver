/**
 * Created by alexandermann on 2017-04-02.
 */
/**
 * Created by alexandermann on 2017-03-26.
 */
import sendVerificationEmail from '../../../../mailer/sendVerificationEmail';
import { generateEmailVerificationUrl } from '../../../helpers';

export default (async function(req, res) {
  try {
    const { emailToVerify, token, user: { firstName } } = req.body.payload.changedVerifyEmail;
    const actionUrl = generateEmailVerificationUrl(token);
    await sendVerificationEmail({
      firstName,
      recipientEmail: emailToVerify,
      emailVerifiedToken: token,
      actionUrl,
    });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});
