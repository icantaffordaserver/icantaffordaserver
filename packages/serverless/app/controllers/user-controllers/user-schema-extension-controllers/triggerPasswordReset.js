process.env.TZ = 'UTC'
import { createClient } from '../../../../config/GraphQLClient'
import { generateUniqueToken, generateExpiryDate } from '../../../helpers'

import createPasswordResetMutation from '../../../graphql/mutations/createPasswordResetMutation'

export default async (req, res) => {
  const email = req.body.data.email
  const client = createClient()

  try {
    // Get userId by email
    const response = await client.request(`
      query {
        User(email: "${email}"){
          id
        }
      }`)

    if (!response.User) throw new Error('Invalid Credentials.')

    const variables = {
      token: await generateUniqueToken(),
      expiry: generateExpiryDate(),
      userId: response.User.id,
    }

    // Create a new password reset entry
    await client.request(createPasswordResetMutation, variables)

    res.status(200).send({ message: 'Password reset created.' })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: error.message })
  }
}
