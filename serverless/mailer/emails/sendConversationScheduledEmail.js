/**
 * Created by alexandermann on 2017-04-14.
 */
const PostmarkClient = require('../PostmarkClient');

module.exports = function sendConversationScheduledEmail(email, conversationTime) {
  // TODO:
  // should include some checks here to determine what form the time is in, but the job of this
  // function should only be to send the email and nothing more
  PostmarkClient.sendEmailWithTemplate({
    From: 'info@shiftwith.us',
    To: email,
    TemplateId: 1501821,
    TemplateModel: {
      conversation_time: conversationTime,
    },
  });
};
