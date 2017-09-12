/**
 * Created by alexandermann on 2017-03-26.
 */

import { isEmail, normalizeEmail } from 'validator';
import { generateUniqueToken } from '../../../helpers/generateUniqueToken';
import isInviteEmailAndTokenValid from '../../../helpers/isInviteEmailAndTokenValid';

export default async (req, res) => {
  try {
    // pull input data off the request
    const { email, requestVars: { inviteId, token: inviteToken } } = req.body.input;
    // we have odd behaviour here - for some reason the inviteId appears as a number from
    // req.body.input and not the string we are expecting, therefore we pass the id through the
    // requestVars object make sure the request has a token and invite id
    if (!inviteId || !inviteToken) {
      return res.status(400).send('Sorry you need a valid invite to sign up at this time.');
    }

    // check if the email and token match the one in the db
    const validInvite = await isInviteEmailAndTokenValid(inviteId, email, inviteToken);
    if (!validInvite) {
      return res
        .status(400)
        .send(new Error('Sorry you need a valid invite to sign up at this time.'));
    }

    // check if email is valid format
    if (!isEmail(email)) return res.status(400).send('Please enter a valid email.');

    // Normalize email
    const normalizedEmail = normalizeEmail(email);

    // normally we would check to see if the email is taken, but scaphold will do this for us via
    // the "unique" constraint in the control panel

    //  ************************** DISABLED FOR BETA ****************************
    // generate a unique token set to expire in 1 day, UTC
    // const token = await generateUniqueToken();
    // const tokenExpiry = Date.now() + 86400000;

    // send the data along the "logic" flow in the expected format to update the store
    return res.send({
      input: {
        ...req.body.input, // destructure the current input, then overwrite anything we want to modify
        username: normalizedEmail, // this is the "unique id" part for the user, always include it
        email: normalizedEmail,
        emailVerified: true,
        inviteId,
        // verifyEmail: {
        //   emailToVerify: normalizedEmail,
        //   token,
        //   tokenExpiry,
        // },
        requestVars: null, // because this is the last function in the chain, clear request vars, TODO: put this in seperate function to clear all requestVars for all types that include them
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
