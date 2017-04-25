/**
 * Created by alexandermann on 2017-04-21.
 */
export function generateInviteEmailUrl(inviteId, token) {
  return `https://shiftwithus.ngrok.io/signup/${inviteId}/${token}`;
}
