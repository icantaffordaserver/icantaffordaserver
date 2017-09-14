/**
 * Created by alexandermann on 2017-03-26.
 */
import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendInviteEmail({
  firstName,
  recipientEmail,
  actionUrl,
}) {
  return new Promise((resolve, reject) => {
    PostmarkMailer.sendEmailWithTemplate(
      {
        From: 'hello@toktumi.io',
        To: recipientEmail,
        TemplateId: 1735761,
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
}
