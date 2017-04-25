/**
 * Created by alexandermann on 2017-03-27.
 */
import postmarkClient from '../PostmarkClient';

export default function sendPasswordResetEmail(
  { firstName, recipientEmail, actionUrl, operatingSystem, browserName },
) {
  return new Promise((resolve, reject) => {
    postmarkClient.sendEmailWithTemplate(
      {
        From: 'info@shiftwith.us',
        To: recipientEmail,
        TemplateId: 1448201,
        TemplateModel: {
          name: firstName,
          action_url: actionUrl,
          operating_system: operatingSystem,
          browser_name: browserName,
          support_url: 'mailto:info@shiftwith.us',
        },
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
  });
}
