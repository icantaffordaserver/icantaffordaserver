/**
 * Created by alexandermann on 2017-03-26.
 */
import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendInviteEmail({
  firstName,
  recipientEmail,
  actionUrl,
}) {
  console.log(firstName, recipientEmail, actionUrl)
  return new Promise((resolve, reject) => {
    PostmarkMailer.sendEmailWithTemplate(
      {
        From: process.env.EMAIL_TO_SEND_FROM,
        To: recipientEmail,
        TemplateId: 1735761,
        TemplateModel: {
          name: firstName,
          actionUrl,
        },
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      },
    )
  })
}
