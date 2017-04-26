/**
 * Created by alexandermann on 2017-03-05.
 */
import client from '../../graphql/lokkaClient'

// this is an async logic function because we do not want to hold up the
// actual response for the user. This function, accompanied with some
// TODO: node cron job deleting expired reset tokens
// should suffice for keeping this table small
export default async (req, res) => {
  const { id } = req.body.payload.changedPasswordReset
  const deletePasswordResetMutation = `
    ($id: ID!) {
      deletePasswordReset(input:{id: $id}) {
        clientMutationId
      }
    }
  `
  try {
    // delete the password entry in passwordReset table, as it has completed
    await client.mutate(deletePasswordResetMutation, { id })
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}
