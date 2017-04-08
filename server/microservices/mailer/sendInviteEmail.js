/**
 * Created by alexandermann on 2017-03-26.
 */
import postmarkClient from './PostmarkMailer';

export default function sendInviteEmail({ firstName, recipientEmail, actionUrl }) {
  return new Promise((resolve, reject) => {
    postmarkClient.sendEmailWithTemplate(
      {
        From: 'info@shiftwith.us',
        To: recipientEmail,
        TemplateId: 1473601,
        TemplateModel: {
          name: firstName,
          support_email: 'info@shiftwith.us',
          action_url: actionUrl,
        },
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
  });
}
