/**
 * Created by alexandermann on 2017-04-05.
 */
import { success, failure } from '../../../../libs/response-lib'
import sendInviteEmail from '../../../../mailer/sendInviteEmail'
import { generateInviteEmailUrl } from '../../../helpers'

export const handler = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body)
  console.log(requestBody)
  const { id: inviteId, firstName, email, token } = requestBody.payload.changedInvites

  const actionUrl = generateInviteEmailUrl(inviteId, token)

  await sendInviteEmail({
    firstName,
    recipientEmail: email,
    emailVerifiedToken: token,
    actionUrl,
  })
  callback(null, success({ status: 'Message sent successfully' }))
}
