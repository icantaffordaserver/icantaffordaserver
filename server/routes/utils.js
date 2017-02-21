/**
 * Created by alexandermann on 2017-02-03.
 */
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { sendTemplate } from '../mail/Mailer';

// if unfamiliar about JWT please read here: https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-08#section-4
export function generateJWT(user) {
  const payload = {
    iss: 'shiftwith.us', // the issuer of the token
    sub: user.id, // the subject of the token, here it is the user uuid
    iat: moment().unix(), // issued at, time the token was created
    exp: moment().add(7, 'days').unix(), // expiry time of the token
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

export function sendVerificationEmail(firstName, email, hostUrl, token) {
  const mergeObj = {
    name: firstName,
    email,
    url: `http://${hostUrl}/users/${token}/verify`,
  };
  return sendTemplate('confirm-email', mergeObj);
}