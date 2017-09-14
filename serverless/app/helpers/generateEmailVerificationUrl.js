/**
 * Created by alexandermann on 2017-04-21.
 */
export function generateEmailVerificationUrl(token) {
  return `https://643f62c3.ngrok.io/verify/${token}`
}
