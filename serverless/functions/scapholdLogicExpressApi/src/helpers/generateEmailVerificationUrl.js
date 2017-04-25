/**
 * Created by alexandermann on 2017-04-21.
 */
export function generateEmailVerificationUrl(token) {
  return `https://shiftwithus.ngrok.io/verify/${token}`;
}
