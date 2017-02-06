/**
 * Created by alexandermann on 2017-02-03.
 */
import { UserAccounts } from '../models/UserAccounts';
import { generateJWT } from './utils';
import { sendTemplate } from '../mail/Mailer';
import { generateUniqueToken } from '../models/helpers';
/**
 * POST /login
 * Sign in with email and password
 */
export function loginPost(req, res, next) {
  new UserAccounts({ email: req.body.email })
    .fetch({ withRelated: 'profile' })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          msg: `The email address ${req.body.email} is not associated with any account. Double-check your
                    email address and try again.`,
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(401).send({ msg: 'Invalid email or password' });
        }
        res.send({ token: generateJWT(user.toJSON()), user: user.toJSON() });
      });
    });
}

/**
 * POST /forgot
 */
export async function forgotPost(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  try {
    const token = await generateUniqueToken();
    const user = await new UserAccounts({ email: req.body.email }).fetch({ withRelated: 'profile' });
    if (!user) {
      return res.status(400).send({ msg: `The email address ${req.body.email} is not associated with any account.` });
    }
    user.set('passwordResetToken', token);
    user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
    await user.save(user.changed, { patch: true });
    const firstName = user.toJSON().profile.first_name;
    const email = user.toJSON().email;
    const resetUrl = `http://${req.headers.host}/reset/${token}`;

    const sentEmail = await sendTemplate('forgot-password', {
      name: firstName,
      email,
      url: resetUrl,
    });
    res.send({ msg: `An email has been sent to ${email} with further instructions.` });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: 'An error occurred while trying to reset the password.' });
  }
}

/**
 * POST /reset
 */
export function resetPost(req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirm', 'Passwords must match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  async.waterfall([
    function (done) {
      new UserAccounts({ passwordResetToken: req.params.token })
        .where('passwordResetExpires', '>', new Date())
        .fetch({ withRelated: 'profile' })
        .then((user) => {
          if (!user) {
            return res.status(400).send({ msg: 'Password reset token is invalid or has expired.' });
          }
          user.set('password_hash', req.body.password);
          user.set('passwordResetToken', null);
          user.set('passwordResetExpires', null);
          user.save(user.changed, { patch: true }).then(() => {
            done(null, user);
          });
        });
    },
    function (user, done) {
      sendTemplate('password-changed', {
        name: user.toJSON().profile.first_name,
        email: user.toJSON().email,
      }).then((result) => {
        res.send({ msg: 'Your password has been changed successfully.' });
        done();
      });
    },
  ]);
}