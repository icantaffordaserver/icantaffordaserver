/**
 * Created by alexandermann on 2017-03-27.
 */
import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendPasswordResetEmail({
  firstName,
  recipientEmail,
  actionUrl,
  operatingSystem,
  browserName,
}) {
  if (
    firstName &&
    recipientEmail &&
    actionUrl &&
    operatingSystem &&
    browserName
  ) {
    return new Promise((resolve, reject) => {
      PostmarkMailer.sendEmailWithTemplate(
        {
          From: 'hello@toktumi.io',
          To: recipientEmail,
          TemplateId: 1448201,
          TemplateModel: {
            name: firstName,
            action_url: actionUrl,
            operating_system: operatingSystem,
            browser_name: browserName,
            support_url: 'hello@toktumi.io',
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
      'Email requires firstName, reciepientEmail, actionUrl, operatingSystem and browserName.',
    )
}
