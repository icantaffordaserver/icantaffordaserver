import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendSoloInvite2Email({
  firstName,
  recipientEmail,
  matchName,
  date,
  time,
  actionUrl,
}) {
  if (firstName && recipientEmail && matchName && date && time && actionUrl) {
    return new Promise((resolve, reject) => {
      PostmarkMailer.sendEmailWithTemplate(
        {
          From: 'hello@toktumi.io',
          To: recipientEmail,
          TemplateId: 4002343,
          TemplateModel: {
            name: firstName,
            match_name: matchName,
            date,
            time,
            actionUrl,
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
      'Email requires firstName, reciepientEmail, matchName, date ,actionUrl and time.',
    )
}
