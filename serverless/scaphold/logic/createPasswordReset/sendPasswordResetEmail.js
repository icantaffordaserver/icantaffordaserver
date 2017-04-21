/**
 * Created by alexandermann on 2017-03-27.
 */
import sendEmail from '../../../mailer/sendPasswordResetEmail';
import client from '../../lokkaClient';

const getPasswordResetQuery = `
  query getPwId($passwordResetId: ID!) {
    getPasswordReset(id: $passwordResetId) {
      email
      resetToken
      resetExpires
      securityInfo
      user {
        firstName
      }
    }
  }
`;

export default (async function sendPasswordResetEmail(req, res) {
  try {
    const { id } = req.body.payload.changedPasswordReset;
    // have to fetch the data from scaphold because permissions don't pass this to async
    // function, probably a better way to structure the permissions but will optimize later, TODO
    const passwordResetResponse = await client.query(getPasswordResetQuery, {
      passwordResetId: id,
    });
    const {
      email,
      user: { firstName },
      securityInfo,
      resetToken,
    } = passwordResetResponse.getPasswordReset;
    const actionUrl = `localhost:3000/reset/${id}/${resetToken}`;
    await sendEmail({
      firstName,
      recipientEmail: email,
      actionUrl,
      operatingSystem: securityInfo.os,
      browserName: securityInfo.browser,
    });
    // send the data along the "logic" flow in the expected format to update the store
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});
