/**
 * Created by alexandermann on 2017-03-26.
 */
import postmarkClient from '../PostmarkClient';

export default function sendInviteEmail({ firstName, recipientEmail, actionUrl }) {
  return new Promise((resolve, reject) => {
    postmarkClient.sendEmailWithTemplate(
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
        if (error) reject(error);
        else resolve(result);
      },
    );
  });
}
