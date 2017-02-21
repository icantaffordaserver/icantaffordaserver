/**
 * Created by alexandermann on 2017-02-03.
 */
import { createUser } from '../../models/helpers';
import { Invites } from '../../models/UserAccounts';
import { generateJWT, sendVerificationEmail } from '../utils';
import { sendTemplate } from '../../mail/Mailer';
/**
 * POST /signup
 */
export async function signUpPost(req, res, next) {
  // sign a user up
  try {
    let newUser = await createUser(req.body.first_name, req.body.last_name, req.body.email, req.body.password);
    newUser = newUser.toJSON();
    res.send({ token: generateJWT(newUser), user: newUser });

    // send verification email
    const sentEmail = await sendVerificationEmail(newUser.profile.first_name, newUser.email, req.headers.host, newUser.email_verified_token);
    // console.log(sentEmail);
  } catch (err) {
    console.log(err);
    if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
      return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
    }
    res.status(400).send({ msg: 'Some error occurred.' });
  }
}

/**
 * POST /signup/invite/:inviteId
 *
 * User sign up based on an invite sent from the admin panel
 */
export async function inviteSignUpPost(req, res, next) {
  // check invite exists and has not been accepted
  const invite = await new Invites({ id: req.params.inviteId }).fetch();
  if (!invite) {
    return res.status(400).send({ msg: 'Your sign up cannot be accepted at this time.' });
  } else if (invite.toJSON().accepted) {
    return res.status(400).send({ msg: 'This invite has already been accepted.' });
  }

  // check invite email matches user email
  const userEmail = req.body.email;
  if (invite.toJSON().email !== userEmail) {
    return res.status(400).send({ msg: 'Invite code does not match the email specified.' });
  }

  // sign user up
  try {
    const userAccount = await createUser(req.body.first_name, req.body.last_name, req.body.email, req.body.password);
    const user = userAccount.toJSON();

    // set the invite to accepted, and store the new user account id
    await invite.save({ user_account_id: user.id, accepted: true }, { patch: true });
    res.send({ token: generateJWT(user), user });
    // send verification email
    const mergeObj = {
      name: user.profile.first_name,
      email: user.email,
      url: `http://${req.headers.host}/verify/${user.email_verified_token}`,
    };
    const sentEmail = await sendTemplate('confirm-email', mergeObj);
    console.log(sentEmail);
  } catch (err) {
    console.log(err);
    if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
      res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
    }
  }
}