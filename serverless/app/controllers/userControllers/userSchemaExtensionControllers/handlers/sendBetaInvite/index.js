import { createClient } from '../../../../../../config/GraphQLClient'
import {
  generateUniqueToken,
  isValidEmail,
  generateInviteEmailUrl,
} from '../../../../../helpers'
import { sendInviteEmail } from '../../../../../mailer'

import createInviteMutation from '../../../../../graphql/mutations/createInviteMutation'

export default async (req, res) => {
  const client = createClient()
  const { id, emailToInvite, firstName, lastName } = req.body.data

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
