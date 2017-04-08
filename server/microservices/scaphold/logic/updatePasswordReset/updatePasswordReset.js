/**
 * Created by alexandermann on 2017-03-03.
 */

import client from '../../lokkaClient';

export default async function (req, res) {
  // check the token matches the one currently stored, if not return error
  const passwordResetQuery = `
    query passwordReset($id: ID!) {
      getPasswordReset(id: $id) {
        resetToken
        user {
          id
        }
      }
    }
  `;

  const passwordResetMutation = `
    ($userId: ID!, $newPassword: Secret!){
      updateUser(input:{id:$userId, password: $newPassword}){
        clientMutationId
      }
    }
  `;

  try {
    // pull off relevant data from the submission
    const { id, resetToken, newPassword } = req.body.input;

    // query the server to check submission with data store
    const passwordResetQueryResponse = await client.query(passwordResetQuery, { id });

    // check that a response exists
    if (!passwordResetQueryResponse.getPasswordReset) {
      return res.status(400).send(new Error('An error occurred while processing this request. Please try again.'));
    }

    // pull relevant data from the query
    const { resetToken: dbToken, user: { id: userId } } = passwordResetQueryResponse.getPasswordReset;

    // check if the token in the db matches the token provided
    if (dbToken !== resetToken) {
      return res.status(400).send(new Error('An error occurred while processing this request. Please try again.'));
    }

    // save the password provided in the input
    await client.mutate(passwordResetMutation, { userId, newPassword });

    return res.send({ ...req.body });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
