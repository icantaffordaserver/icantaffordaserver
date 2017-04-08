/**
 * Created by alexandermann on 2017-04-05.
 */
import sendInviteEmail from '../../../../mailer/sendInviteEmail';
import { generateInviteEmailUrl } from '../../../helpers';

export default (async function (req, res) {
  try {
    const { id, firstName, email, token } = req.body.payload.changedInvites;
    const actionUrl = generateInviteEmailUrl(id, token);

    await sendInviteEmail({
      firstName,
      recipientEmail: email,
      emailVerifiedToken: token,
      actionUrl,
    });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});
