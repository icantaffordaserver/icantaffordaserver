/**
 * Created by alexandermann on 2017-03-26.
 */
import postmarkClient from './PostmarkMailer';

export default function sendVerificationEmail({ firstName, recipientEmail, actionUrl }) {
  return new Promise((resolve, reject) => {
    postmarkClient.sendEmailWithTemplate(
      {
        From: 'info@shiftwith.us',
        To: recipientEmail,
        TemplateId: 1446421,
        TemplateModel: {
          name: firstName,
          action_url: actionUrl,
          login_url: 'https://www.shiftwith.us/login',
          username: recipientEmail,
        },
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
  });
}
