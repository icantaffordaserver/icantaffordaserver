/**
 * Created by alexandermann on 2017-02-03.
 */
import { UserAccounts } from '../../models/UserAccounts';
import { generateJWT } from '../utils';
/**
 * GET /unlink/:provider
 */
export function unlink(req, res, next) {
  new UserAccounts({ id: req.user.id })
    .fetch()
    .then((user) => {
      switch (req.params.provider) {
        case 'facebook':
          user.set('facebook', null);
          break;
        case 'google':
          user.set('google', null);
          break;
        case 'twitter':
          user.set('twitter', null);
          break;
        case 'vk':
          user.set('vk', null);
          break;
        default:
          return res.status(400).send({ msg: 'Invalid OAuth Provider' });
      }
      user.save(user.changed, { patch: true }).then(() => {
        res.send({ msg: 'Your account has been unlinked.' });
      });
    });
}


/**
 * POST /auth/facebook
 * Sign in with Facebook
 */
export function authFacebook(req, res) {
  const profileFields  = ['id', 'name', 'email', 'gender', 'location'];
  const accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  const graphApiUrl    = `https://graph.facebook.com/v2.5/me?fields=${profileFields.join(',')}`;

  const params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri,
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, (err, response, accessToken) => {
    if (accessToken.error) {
      return res.status(500).send({ msg: accessToken.error.message });
    }

    // Step 2. Retrieve user's profile information.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, (err, response, profile) => {
      if (profile.error) {
        return res.status(500).send({ msg: profile.error.message });
      }

      // Step 3a. Link accounts if user is authenticated.
      if (req.isAuthenticated()) {
        new UserAccounts({ facebook: profile.id })
          .fetch()
          .then((user) => {
            if (user) {
              return res.status(409).send({ msg: 'There is already an existing account linked with Facebook that belongs to you.' });
            }
            user = req.user;
            user.set('name', user.get('name') || profile.name);
            user.set('gender', user.get('gender') || profile.gender);
            user.set('picture', user.get('picture') || `https://graph.facebook.com/${profile.id}/picture?type=large`);
            user.set('facebook', profile.id);
            user.save(user.changed, { patch: true }).then(() => {
              res.send({ token: generateJWT(user), user });
            });
          });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        new UserAccounts({ facebook: profile.id })
          .fetch()
          .then((user) => {
            if (user) {
              return res.send({ token: generateJWT(user), user });
            }
            new UserAccounts({ email: profile.email })
              .fetch()
              .then((user) => {
                if (user) {
                  return res.status(400).send({ msg: `${user.get('email')} is already associated with another account.` });
                }
                user = new UserAccounts();
                user.set('name', profile.name);
                user.set('email', profile.email);
                user.set('gender', profile.gender);
                user.set('location', profile.location && profile.location.name);
                user.set('picture', `https://graph.facebook.com/${profile.id}/picture?type=large`);
                user.set('facebook', profile.id);
                user.save().then((user) => res.send({ token: generateJWT(user), user }));
              });
          });
      }
    });
  });
}

export function authFacebookCallback(req, res) {
  res.render('loading', { layout: false });
}