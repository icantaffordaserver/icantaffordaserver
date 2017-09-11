/**
 * Created by alexandermann on 2017-03-12.
 */
import crypto from 'crypto';

export default function generateToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
}
