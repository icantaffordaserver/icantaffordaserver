/**
 * Created by alexandermann on 2017-04-05.
 */
import sendInviteEmail from '../../../../../../mailer/src/emails/sendInviteEmail'
import { generateInviteEmailUrl } from '../../../helpers/generateInviteEmailUrl'

export default async (req, res) => {
  console.log(req.body)
  const { id: inviteId, firstName, email, token } = req.body.payload.changedInvites

  const actionUrl = generateInviteEmailUrl(inviteId, token)

  await sendInviteEmail({
    firstName,
    recipientEmail: email,
    emailVerifiedToken: token,
    actionUrl,
  })
  res.sendStatus(200).send('Message sent successfully' )
}
