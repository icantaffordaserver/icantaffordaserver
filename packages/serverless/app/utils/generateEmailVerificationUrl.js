export default function generateEmailVerificationUrl(token) {
  return `${process.env.PLUTO_CLIENT_DOMAIN}/verify/${token}`
}
