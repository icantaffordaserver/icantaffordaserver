import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendSoloInvite1Email({
  firstName,
  recipientEmail,
  matchName,
  actionUrl
}) {
    if (firstName && recipientEmail && matchName && actionUrl) {
        
  return new Promise((resolve, reject) => {
    PostmarkMailer.sendEmailWithTemplate(
      {
        From: 'hello@toktumi.io',
        To: recipientEmail,
        TemplateId: 4002621,
        TemplateModel: {
          name: firstName,
          match_name: matchName,
          action_url: actionUrl
        },
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      },
    )
  })
    }
    else throw new Error("Email requires firstName, reciepientEmail, actionUrl and matchName.")       
    
}
