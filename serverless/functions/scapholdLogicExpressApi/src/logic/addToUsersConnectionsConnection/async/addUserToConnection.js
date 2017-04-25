/**
 * Created by alexandermann on 2017-04-18.
 */
import moment from 'moment';
import sendConversationScheduledEmail from '../../../../../../mailer/src/emails/sendConversationScheduledEmail';

export default async (req, res) => {
  const { user: { email }, connections: { connectionTime } } = req.body

  // convert the ISO8601 string a human readable date, ex - "Sunday, February 14th @ 3:25 pm"
  const conversationTime = moment(connectionTime).format('dddd, MMMM Do @ h:mm a')
  sendConversationScheduledEmail(email, conversationTime)

  res.sendStatus(200)
}
