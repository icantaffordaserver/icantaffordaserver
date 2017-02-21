/**
 * Created by alexandermann on 2017-02-03.
 */
import { UserAccounts } from '../../models/UserAccounts';

/**
 * PUT /account
 * Update profile information OR change password.
 */
export async function accountPut(req, res, next) {
  let user = new UserAccounts({ id: req.user.id });
  if ('password' in req.body) {
    user.save({ password_hash: req.body.password }, { patch: true });
  } else {
    // update user account properties
    user.save({
      email: req.body.email,
    }, { patch: true });
    // update user profile properties
    user.related('profile').save({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      city: req.body.location,
    }, { patch: true });
  }
  try {
    user = await user.fetch({ withRelated: 'profile' });
    if ('password' in req.body) {
      res.send({ msg: 'Your password has been changed.' });
    } else {
      res.send({ user: user.toJSON(), msg: 'Your profile information has been updated.' });
    }
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).send({ msg: 'The email address you have entered is already associated with another account.' });
    } else {
      res.status(400).send({ msg: 'Error occurred while updating your account.' });
    }
  }
}

/**
 * DELETE /account
 */
export async function accountDelete(req, res, next) {
  try {
    await new UserAccounts({ id: req.user.id }).destroy();
    res.send({ msg: 'Your account has been permanently deleted.' });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: 'An error occurred while trying to delete your account.' });
  }
}
