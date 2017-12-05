import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendGroupInvites1Email({
  firstName,
  recipientEmail,
  number,
  actionUrl,
}) {
  if (firstName && recipientEmail && number && actionUrl) {
    return new Promise((resolve, reject) => {
      PostmarkMailer.sendEmailWithTemplate(
        {
          From: 'hello@toktumi.io',
          To: recipientEmail,
          TemplateId: 4002346,
          TemplateModel: {
            name: firstName,
            number,
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
      'Email requires firstName, reciepientEmail, actionUrl and number.',
    )
}
