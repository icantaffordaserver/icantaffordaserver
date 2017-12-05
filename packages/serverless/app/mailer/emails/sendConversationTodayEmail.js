import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendConverationTodayEmail({
  firstName,
  recipientEmail,
  conversationTime,
  actionUrl,
}) {
  if (firstName && recipientEmail && conversationTime && actionUrl) {
    return new Promise((resolve, reject) => {
      PostmarkMailer.sendEmailWithTemplate(
        {
          From: 'hello@toktumi.io',
          To: recipientEmail,
          TemplateId: 1501701,
          TemplateModel: {
            name: firstName,
            conversation_time: conversationTime,
            action_url: actionUrl,
          },
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
    })
  } else
    throw new Error(
      'Email requires firstName, reciepientEmail, actionUrl and conversationTime.',
    )
}
