export default function generateEmailVerificationUrl(token) {
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/verify/${token}`
}
