/**
 * Created by alexandermann on 2017-04-12.
 */
import { sendInviteEmail } from 'mailer'
import getInviteById from '../../../graphql/queries/getInviteByIdQuery'
import graphqlFetch from '../../../graphql/graphqlFetch'
import { generateInviteEmailUrl } from '../../../helpers/generateInviteEmailUrl'

export default async (req, res) => {
  if (req.body.input.requestVars && req.body.input.requestVars.resendInvite) {
    try {
      const { id } = req.body.input

      // fetch the invite to get the data from the db
      const response = await graphqlFetch(getInviteById, { inviteId: id })
      const { email, token, isAccepted, firstName } = response.data.getInvites

      if (isAccepted) {
        return res.status(400).send(new Error('Invite is already accepted, cannot resend'))
      }

      // send the email
      await sendInviteEmail({
        firstName,
        recipientEmail: email,
        emailVerifiedToken: token,
        actionUrl: generateInviteEmailUrl(id, token),
      })

      res.send({ input: { ...req.body.input, requestVars: null } }) // TODO: remove request vars here, refactor into own func.
    } catch (err) {
      console.log(err)
      return res.status(400).send(err)
    }
  } else {
    res.send({ input: { ...req.body.input, requestVars: null } }) // TODO: remove request vars here, refactor into own func.
  }
}
