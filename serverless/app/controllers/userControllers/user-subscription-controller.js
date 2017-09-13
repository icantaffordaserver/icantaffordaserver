import { sendVerificationEmail } from 'mailer'
import { generateEmailVerificationUrl } from '../../../helpers/generateEmailVerificationUrl'

const sendVerificationEmailHandler = async (req, res) => {
  try {
    const {
      emailToVerify,
      token,
      user: { firstName },
    } = req.body.payload.changedVerifyEmail
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

export { sendVerificationEmailHandler }
