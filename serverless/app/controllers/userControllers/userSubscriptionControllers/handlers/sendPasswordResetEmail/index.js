/**
 * Created by alexandermann on 2017-03-27.
 */
import { sendPasswordResetEmail } from '../../../../../mailer'
import { createClient } from '../../../../../../config/GraphQLClient'

import getPasswordResetQuery from '../../../../../graphql/queries/getPasswordResetQuery'

export default async (req, res) => {
  const id = req.body.data.PasswordReset.node.id
  const client = createClient()

  try {
    const response = await client.request(getPasswordResetQuery, { id })
    const token = response.PasswordReset.token
    const { firstName, email } = response.PasswordReset.user
    const actionUrl = `https://toktumi-client.ngrok.io/reset/${id}/${token}`

    await sendPasswordResetEmail({
      firstName,
      recipientEmail: email,
      actionUrl,
      operatingSystem: 'temporary',
      browserName: 'temporary',
    })
    res.status(200).send({ message: 'Password Reset email sent.' })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Email not sent' })
  }
}
