/**
 * Created by alexandermann on 2017-03-03.
 */
// import isEmail from 'validator/lib/isEmail';
import { isEmail, normalizeEmail } from 'validator';
import client from '../../../graphql/lokkaClient';
import { generateUniqueToken } from '../../../helpers/generateUniqueToken';


const getUserIdQuery = `
query getUser($email: String){
    viewer {
      allUsers(where: {username: {eq: $email}}) {
        edges {
          node {
            id
            email
            passwordReset {
              id
            }
          }
        }
      }
    }
  }
`;
// note that lokka uses a different syntax for mutations than apollo, doesn't include
// "mutation someNameForMutation" part
const deleteExistingPasswordResetMutation = `
($id: ID!) {
  deletePasswordReset(input: {id: $id}) {
    clientMutationId
  }
}`;

export default async function passwordReset(req, res) {
  try {
    let { email: inputEmail, securityInfo } = req.body.input;

    // check if email is valid format
    if (!isEmail(inputEmail)) return res.status(400).send('Please enter a valid email.');

    // Save the email sent from forgot password page and normalize it
    inputEmail = normalizeEmail(inputEmail);

    // Query graphql server with email submitted to get userId
    const response = await client.query(getUserIdQuery, { email: inputEmail });

    // check if user exists in db
    if (response.viewer.allUsers.edges.length === 0) {
      return res.status(400).send('The email entered does not exist.');
    }

    // pull relevant fields, generate the reset token and expiry
    const { id: userId, email } = response.viewer.allUsers.edges[0].node;
    const resetToken = await generateUniqueToken();
    const resetExpires = Date.now() + 86400000; // 24hrs before expiry

    // check if password reset token exists already for requested user, if it does delete it
    if (response.viewer.allUsers.edges[0].node && response.viewer.allUsers.edges[0].node.passwordReset) {
      // pull the existing password reset id
      const { id: id2Delete } = response.viewer.allUsers.edges[0].node.passwordReset;
      await client.mutate(deleteExistingPasswordResetMutation, { id: id2Delete });
    }

    // send the data along the "logic" flow in the expected format to update the store
    return res.send({
      input: {
        email,
        userId,
        resetToken,
        resetExpires,
        securityInfo,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}
