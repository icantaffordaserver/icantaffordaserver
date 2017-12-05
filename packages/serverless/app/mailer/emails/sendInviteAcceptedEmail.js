/**
 * Created by alexandermann on 2017-03-26.
 */
import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendInviteEmail({
  firstName,
  recipientEmail,
  actionUrl,
}) {
  if (firstName && recipientEmail && actionUrl) {
    return new Promise((resolve, reject) => {
      PostmarkMailer.sendEmailWithTemplate(
        {
          From: 'hello@toktumi.io',
          To: recipientEmail,
          TemplateId: 1497643,
          TemplateModel: {
            name: firstName,
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
    throw new Error('Email requires firstName, reciepientEmail and actionUrl.')
}
