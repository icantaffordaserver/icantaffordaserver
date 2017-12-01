/**
 * Created by alexandermann on 2017-04-14.
 */
import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendConversationScheduledEmail({
  email, 
  conversationTime,
  actionUrl
}) {
  // TODO:
  // should include some checks here to determine what form the time is in, but the job of this
  // function should only be to send the email and nothing more
  if(email && conversationTime && actionUrl) {
    return new Promise((resolve, reject) => {
      PostmarkMailer.sendEmailWithTemplate(
        {
          From: 'hello@toktumi.io',
          To: email,
          TemplateId: 1501821,
          TemplateModel: {
            conversation_time: conversationTime,
            action_url: actionUrl
          },
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
    })
  }
  else throw new Error("Email requires email, actionUrl and conversationTime.")    
}

