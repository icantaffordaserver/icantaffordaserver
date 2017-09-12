/**
 * Created by alexandermann on 2017-03-26.
 */
import { sendVerificationEmail } from 'mailer'
import { generateEmailVerificationUrl } from '../../../helpers/generateEmailVerificationUrl'

export default async (req, res) => {
  // in the case of the beta, we do not need to send a verification email to verify the user since
  // we have already sent them an invite, therefore do not send the verification email
  if (req.body.payload.changedUser.emailVerified) return res.sendStatus(200)

  try {
    const { firstName, verifyEmail: { emailToVerify, token } } = req.body.payload.changedUser

    const actionUrl = generateEmailVerificationUrl(token)

    await sendVerificationEmail({
      firstName,
      recipientEmail: emailToVerify,
      emailVerifiedToken: token,
      actionUrl,
    })
    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.status(400).send(err)
  }
}
