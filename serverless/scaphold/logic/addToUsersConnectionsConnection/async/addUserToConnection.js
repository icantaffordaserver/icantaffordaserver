/**
 * Created by alexandermann on 2017-04-18.
 */
import moment from 'moment';
import sendConversationScheduledEmail from '../../../../mailer/emails/sendConversationScheduledEmail';

export const handler = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body)
  const { user: { email }, connections: { connectionTime } } = requestBody

  // convert the ISO8601 string a human readable date, ex - "Sunday, February 14th @ 3:25 pm"
  const conversationTime = moment(connectionTime).format('dddd, MMMM Do @ h:mm a')
  sendConversationScheduledEmail(email, conversationTime)

  const response = { statusCode: 200 }

  callback(null, response)
}
