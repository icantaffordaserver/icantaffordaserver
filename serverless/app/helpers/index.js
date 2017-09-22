import crypto from 'crypto'

/**
 * Generate a unique token
 * @returns {Promise.<void>}
 */
export function generateUniqueToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buf) => {
      if (err) {
        reject(err)
      } else {
        resolve(buf.toString('hex'))
      }
    })
  })
}

export function generateInviteEmailUrl(inviteId, token) {
  return `https://beta.toktumi.io/signup/${inviteId}/${token}`
}

export function generateExpiryDate() {
  const now = new Date()
  return new Date(now.getTime() + 86400000).toISOString()
}

export function generateEmailVerificationUrl(token) {
  return `https://toktumi-client.ngrok.io/verify/${token}`
}
