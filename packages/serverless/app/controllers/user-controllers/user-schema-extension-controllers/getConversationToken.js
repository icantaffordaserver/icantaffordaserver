import { jwt } from 'twilio'

import client from '../../../../config/GraphQLClient'
import getUserFromJwt from '../../../utils/getUserFromJwt'

const AccessToken = jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant
const ChatGrant = AccessToken.ChatGrant

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const API_KEY_SID = process.env.TWILIO_VIDEO_API_KEY_SID
const API_KEY_SECRET = process.env.TWILIO_VIDEO_API_KEY_SECRET
const CHAT_SERVICE_SID = process.env.TWILIO_CHAT_SERVICE_SID

export default async (req, res) => {
  const { connectionId } = req.body.data
  const userJwt = req.body.context.auth.token
  const user = userJwt ? (await getUserFromJwt(userJwt)).User : null

  try {
    // Check that the given connection exists and
    // the user requesting a token is associated with the connection
    const response = await client.request(
      `
      query connectionContainsUser($id:ID!, $userId:ID!){
        Connections(id:$id){
          participants(filter:{id:$userId}){
            id
          }
        }
      }
    `,
      { id: connectionId, userId: user.id },
    )

    if (!response.Connections) throw new Error('Connection does not exist.')
    if (response.Connections.participants.length !== 1)
      throw new Error('Invalid Credentials.')

    // Create an Access Token
    const accessToken = new AccessToken(
      ACCOUNT_SID,
      API_KEY_SID,
      API_KEY_SECRET,
    )

    // Set the Identity of this token
    accessToken.identity = user.id

    // Grant access
    const videoGrant = new VideoGrant()
    videoGrant.room = connectionId

    const chatGrant = new ChatGrant({
      serviceSid: CHAT_SERVICE_SID,
    })

    accessToken.addGrant(videoGrant)
    accessToken.addGrant(chatGrant)

    // Serialize the token as a JWT

    const token = accessToken.toJwt()
    res.send({ data: { token } })
  } catch (error) {
    console.error(error)
    res.send({ error: error.message })
  }
}
