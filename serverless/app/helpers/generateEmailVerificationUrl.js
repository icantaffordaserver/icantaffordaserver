/**
 * Created by alexandermann on 2017-04-21.
 */
export function generateEmailVerificationUrl(token) {
  return `https://toktumi-client.ngrok.io/verify/${token}`
}
