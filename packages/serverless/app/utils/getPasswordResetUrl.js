export default function getPasswordResetUrl(id, token) {
  return `${process.env.PLUTO_CLIENT_DOMAIN}/reset/${id}/${token}`
}
