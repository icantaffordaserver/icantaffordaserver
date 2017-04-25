/**
 * Created by alexandermann on 2017-04-24.
 */
import express from 'express'
import mailer from 'mailer';
// IT IS THE IMPORTING OF FUNCTIONS FROM OUTSIDE WHAT SEEMS TO BE EITHER THE PROJECT OR THE FUNCTION
// THE CODE IS EXECUTING IN
// TRYING TO REACH THE MAILER OBJECT CAUSES THIS LAMBDA TO FAIL (SEE WEBPACK ERROR)

const app = express()

app.use('*', async (req, res) => {
  console.log('world')
  const test = await mailer.sendInviteEmail({
    firstName: 'ALex',
    recipientEmail: 'alexandermann11@gmail.com',
    actionUrl: 'google.com',
  })
  console.log(test)
  res.send('hello wolrd')
})

// app.listen(3111, () => console.log('listening...'))

export default app
