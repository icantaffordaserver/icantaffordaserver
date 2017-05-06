/**
 * Created by alexandermann on 2017-03-26.
 */
import postmarkClient from '../PostmarkClient';

export default function sendVerificationEmail({ firstName, recipientEmail, actionUrl }) {
  return new Promise((resolve, reject) => {
    postmarkClient.sendEmailWithTemplate(
      {
        From: 'hello@toktumi.io',
        To: recipientEmail,
        TemplateId: 1446421,
        TemplateModel: {
          name: firstName,
          action_url: actionUrl,
          login_url: 'https://beta.toktumi.io/login',
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
