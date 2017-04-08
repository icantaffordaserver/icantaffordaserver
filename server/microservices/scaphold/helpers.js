/**
 * Created by alexandermann on 2017-04-02.
 */
import crypto from 'crypto';

/**
 * Generate a unique token
 * @returns {Promise.<void>}
 */
export function generateUniqueToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
}

export function generateEmailVerificationUrl(token) {
  return `https://shiftwithus.ngrok.io/verify/${token}`;
}

export function generateInviteEmailUrl(inviteId, token) {
  return `https://shiftwithus.ngrok.io/signup/${inviteId}/${token}`;
}
