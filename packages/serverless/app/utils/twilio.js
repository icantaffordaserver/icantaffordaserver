import { jwt } from 'twilio'

const AccessToken = jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant
const ChatGrant = AccessToken.ChatGrant

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const API_KEY_SID = process.env.TWILIO_VIDEO_API_KEY_SID
const API_KEY_SECRET = process.env.TWILIO_VIDEO_API_KEY_SECRET
const CHAT_SERVICE_SID = process.env.TWILIO_CHAT_SERVICE_SID

export default (req, res) => {
  const { roomName, name } = req.body

  // Create an Access Token
  const accessToken = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET)

  // Set the Identity of this token
  accessToken.identity = name

  // Grant access
  const videoGrant = new VideoGrant()
  videoGrant.room = req.body.roomName

  const chatGrant = new ChatGrant({
    serviceSid: CHAT_SERVICE_SID,
  })

  accessToken.addGrant(videoGrant)
  accessToken.addGrant(chatGrant)

  // Serialize the token as a JWT

  const token = accessToken.toJwt()
  res.send({ token })
}
