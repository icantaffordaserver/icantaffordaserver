/**
 * Created by alexandermann on 2017-04-04.
 */

import { isEmail, normalizeEmail } from 'validator';
import graphqlFetch from '../../../graphqlFetch';
import { generateUniqueToken } from '../../../helpers';
import getUserByEmailQuery from '../../../graphql/getUserByEmailQuery';

export default async (req, res) => {
  try {
    // pull input data off the request
    console.log(req.body.input);
    const { email } = req.body.input;

    // check if email is valid format
    if (!isEmail(email)) return res.status(400).send('Please enter a valid email.');

    // Normalize email
    const normalizedEmail = normalizeEmail(email);

    // query the submitted email
    const response = await graphqlFetch(getUserByEmailQuery, { email: normalizedEmail });

    const emailExists = response.data.viewer.allUsers.edges.length !== 0;
    if (emailExists) return res.status(400).send('User already exists for this email');

    // generate a unique token set to expire in 1 day, UTC
    const token = await generateUniqueToken();

    // send the data along the "logic" flow in the expected format to update the store
    return res.send({
      input: {
        ...req.body.input,
        email: normalizedEmail,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
