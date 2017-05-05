/**
 * Created by alexandermann on 2017-05-04.
 */
const { sendInviteEmail } = require('./lib/mailer.min')

// a simple test to ensure we actually send an email
sendInviteEmail({
  firstName: 'alex',
  recipientEmail: 'alexander.mann@me.com',
  actionUrl: 'google.com',
}).then(() => console.log('done!'))
