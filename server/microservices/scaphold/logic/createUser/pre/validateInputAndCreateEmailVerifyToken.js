/**
 * Created by alexandermann on 2017-03-26.
 */

import { isEmail, normalizeEmail } from 'validator';
import { generateUniqueToken } from '../../../helpers';

export default (async function (req, res) {
  try {
    // pull input data off the request
    const { email, firstName, lastName, password } = req.body.input;

    // check if email is valid format
    if (!isEmail(email)) return res.status(400).send('Please enter a valid email.');

    // Normalize email
    const normalizedEmail = normalizeEmail(email);

    // normally we would check to see if the email is taken, but scaphold will do this for us via
    // the "unique" constraint in the control panel

    // generate a unique token set to expire in 1 day, UTC
    const token = await generateUniqueToken();
    const tokenExpiry = Date.now() + 86400000;

    // send the data along the "logic" flow in the expected format to update the store
    return res.send({
      input: {
        username: normalizedEmail, // this is the "unique id" part for the user, always include it
        email: normalizedEmail,
        firstName,
        lastName,
        password,
        verifyEmail: {
          emailToVerify: normalizedEmail,
          token,
          tokenExpiry,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});
