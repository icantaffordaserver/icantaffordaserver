import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendSoloInvite3Email({
  firstName,
  recipientEmail,
  matchName,
  conversationTime,
  actionUrl,
}) {
  if (
    firstName &&
    recipientEmail &&
    matchName &&
    conversationTime &&
    actionUrl
  ) {
    return new Promise((resolve, reject) => {
      PostmarkMailer.sendEmailWithTemplate(
        {
          From: 'hello@toktumi.io',
          To: recipientEmail,
          TemplateId: 4002345,
          TemplateModel: {
            name: firstName,
            match_name: matchName,
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
      'Email requires firstName, reciepientEmail, matchName, actionUrl and conversationTime.',
    )
}
