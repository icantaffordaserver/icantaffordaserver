export default function generateInviteEmailUrl(inviteId, token) {
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/signup/${inviteId}/${token}`
}
