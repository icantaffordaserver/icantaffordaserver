/**
 * Created by alexandermann on 2017-04-14.
 */
import postmark from 'postmark'

import { POSTMARK_API_KEY } from '../config'

// export the postmark client
export default new postmark.Client(POSTMARK_API_KEY)
