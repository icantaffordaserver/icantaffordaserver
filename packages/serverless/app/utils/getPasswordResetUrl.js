export default function getPasswordResetUrl(id, token) {
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/reset/${id}/${token}`
}
