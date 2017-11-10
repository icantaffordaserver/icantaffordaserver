import crypto from 'crypto'

/**
 * Generate a unique token
 * @returns {Promise.<void>}
 */
const generateUniqueToken = () => {
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

export default generateUniqueToken
