process.env.TZ = 'UTC'
import client from '../../../../config/GraphQLClient'
import generateExpiryDate from '../../../utils/generateExpiryDate'
import generateUniqueToken from '../../../utils/generateUniqueToken'
import createPasswordResetMutation from '../../../graphql/mutations/createPasswordResetMutation'

export default async (req, res) => {
  const email = req.body.data.email

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
