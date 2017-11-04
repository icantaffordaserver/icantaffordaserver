import client from '../../../../config/GraphQLClient'
import updateInviteMutation from '../../../graphql/mutations/updateInviteMutation'
import generateExpiryDate from '../../../utils/generateExpiryDate'
import generateUniqueToken from '../../../utils/generateUniqueToken'
import generateInviteEmailUrl from '../../../utils/generateInviteEmailUrl'
import sendInviteEmail from '../../../mailer/emails/sendInviteEmail'

export default async (req, res) => {
  try {
    console.log(req.body.data.Invite.node)
    // pull the relevant invite details from the invite
    const invite = req.body.data.Invite.node

    // generate the expiry, token, invite URL
    const token = await generateUniqueToken()
    const expiry = generateExpiryDate(7) // expires in 7 days
    const inviteStatus = 'INVITE_EMAIL_SENT'
    const inviteUrl = generateInviteEmailUrl(token)
    // send the email to the user
    await sendInviteEmail({
      firstName: invite.firstName,
      recipientEmail: invite.emailToInvite,
      actionUrl: inviteUrl,
    })

    // save the expiry and the token and update the invite status
    await client.request(updateInviteMutation, {
      inviteId: invite.id,
      inviteStatus,
      token,
      expiry,
    })

    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(200).send({
      error: 'An issue occurred while trying to send the invite email',
    })
  }
}
