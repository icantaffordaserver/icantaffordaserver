/**
 * Created by alexandermann on 2017-04-14.
 */
import postmark from 'postmark'

const { POSTMARK_API_KEY } = process.env

export default new postmark.Client(POSTMARK_API_KEY)
