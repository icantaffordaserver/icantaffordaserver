import { createClient } from '../../../../config/GraphQLClient'
import {
  generateUniqueToken,
  isValidEmail,
  generateInviteEmailUrl,
} from '../../../helpers'
import { sendInviteEmail } from '../../../mailer'

import createInviteMutation from '../../../graphql/mutations/createInviteMutation'

export default async (req, res) => {
  const client = createClient()

  let data = null

  if (req.body.data.InviteRequests !== undefined) {
    data = req.body.data.Invite.node
  } else {
    data = req.body.data
  }
  const { id, emailToInvite, firstName, lastName, isApproved } = data

  if (isApproved !== undefined) {
    if (!isApproved) return
  }

  try {
    if (!await isValidEmail(emailToInvite, client))
      throw new Error('Invalid Email.')

    const token = await generateUniqueToken()

    const variables = {
      token,
      userId: id,
      email: emailToInvite,
      firstName,
      lastName,
    }

    const response = await client.request(createInviteMutation, variables)
    const actionUrl = generateInviteEmailUrl(response.createInvites.id, token)

    await sendInviteEmail({
      firstName,
      recipientEmail: emailToInvite,
      actionUrl,
    })

    res.status(200).send({
      data: { id: response.createInvites.id },
      message: 'Invite sent.',
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: error.message })
  }
}
