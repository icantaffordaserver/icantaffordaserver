export default function generateInviteEmailUrl(token) {
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/signup/${token}`
}
