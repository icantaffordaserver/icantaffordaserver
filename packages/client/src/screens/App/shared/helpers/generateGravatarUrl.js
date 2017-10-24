/**
 * Created by alexandermann on 2017-04-10.
 */
import crypto from 'crypto'

export default email => {
  const md5 = crypto
    .createHash('md5')
    .update(email)
    .digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}
