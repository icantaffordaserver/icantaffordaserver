export default function generateInviteEmailUrl(token) {
  return `${process.env.PLUTO_CLIENT_DOMAIN}/signup/${token}`
}
