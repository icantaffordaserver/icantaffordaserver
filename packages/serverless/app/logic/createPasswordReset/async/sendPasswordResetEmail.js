/**
 * Created by alexandermann on 2017-03-27.
 */
import { sendPasswordResetEmail } from "../../../mailer";
import { createClient } from "../../../../config/GraphQLClient";

import getPasswordResetQuery from "../../../graphql/queries/getPasswordResetQuery";

export default async (req, res) => {
  const id = req.body.data.PasswordReset.node.id;
  const client = createClient();

  client
    .request(getPasswordResetQuery, { id })
    .then(response => {
      const token = response.PasswordReset.token;
      const { firstName, email } = response.PasswordReset.user;
      const actionUrl = `https://toktumi-client.ngrok.io/reset/${id}/${token}`;
      return sendPasswordResetEmail({
        firstName,
        recipientEmail: email,
        actionUrl,
        operatingSystem: "temporary",
        browserName: "temporary"
      });
    })
    .then(() => res.status(200).send({ message: "Password Reset email sent." }))
    .catch(err => {
      console.error(err);
      res.status(400).send({ message: "Email not sent" });
    });
};
