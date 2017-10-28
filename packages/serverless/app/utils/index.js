import crypto from 'crypto'
import { isEmail } from 'validator'

import getUserByEmailQuery from '../graphql/queries/getUserByEmailQuery'

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
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/signup/${inviteId}/${token}`
}

export function getPasswordResetUrl(id, token) {
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/reset/${id}/${token}`
}

/**
 * Generates an expiry date based on given milliseconds.
 * 1 Day = 86400000 ms
 * @param {Date} days
 */
export function generateExpiryDate(days = 86400000) {
  const daysInMS = days || 86400000
  const now = new Date()
  return new Date(now.getTime() + daysInMS).toISOString()
}

export function generateEmailVerificationUrl(token) {
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/verify/${token}`
}

export async function isValidEmail(email, client) {
  if (!isEmail(email)) return false

  const userExits = await client.request(getUserByEmailQuery, { email })
  console.log(userExits)
  if (userExits.User) return false

  return true
}
