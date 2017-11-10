/**
 * Created by alexandermann on 2017-04-14.
 */
import PostmarkMailer from '../../../config/PostmarkMailer'

export default (email, conversationTime) => {
  // TODO:
  // should include some checks here to determine what form the time is in, but the job of this
  // function should only be to send the email and nothing more
  PostmarkMailer.sendEmailWithTemplate({
    From: 'hello@toktumi.io',
    To: email,
    TemplateId: 1501821,
    TemplateModel: {
      conversation_time: conversationTime,
    },
  })
}
