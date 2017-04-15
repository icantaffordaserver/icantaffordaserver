/**
 * Created by alexandermann on 2017-04-10.
 */
const sendConversationScheduledEmail = require('./mailer/emails/sendConversationScheduledEmail');
const moment = require('moment');

exports.helloWorld = (req, res) => {
  const {
    user: { email },
    connections: { connectionTime },
  } = req.body.payload.changedUsersConnections;

  // convert the ISO8601 string a human readable date, ex - "Sunday, February 14th @ 3:25 pm"
  const conversationTime = moment(connectionTime).format('dddd, MMMM Do @ h:mm a');

  sendConversationScheduledEmail(email, conversationTime);
  res.sendStatus(200);
};
