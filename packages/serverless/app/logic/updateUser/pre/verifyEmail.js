/**
 * Created by alexandermann on 2017-03-27.
 */
import graphqlFetch from '../../../graphql/graphqlFetch'
import deleteVerifyEmailMutation from '../../../graphql/mutations/deleteVerifyEmailMutation'

export default async (req, res) => {
  // check the token matches the one currently stored, if not return error
  const checkEmailVerifiedTokenQuery = `
    query checkEmailVerifiedToken($userId: ID!) {
      getUser(id: $userId) {
        id
        verifyEmail {
          id
          emailToVerify
          token
          tokenExpiry
        }
      }
    }
  `

  const setEmailVerifiedMutation = `
    mutation setEmailVerified($userId: ID!){
      updateUser(input:{id:$userId, emailVerified: true}){
        clientMutationId
      }
    }
  `

  try {
    console.log(req.body)
    // if requestVars don't contain a checkToken, then user is not trying to verify email
    if (!req.body.input.requestVars || !req.body.input.requestVars.checkToken) {
      return res.send({ ...req.body }) // pass the request body down to any other logic functions
    }

    // pull off relevant data from the submission
    const { id, requestVars: { checkToken } } = req.body.input

    // query the server to compare input token vs token in db
    const response = await graphqlFetch(checkEmailVerifiedTokenQuery, { userId: id })

    // check that a response exists
    if (!response.data.getUser) {
      console.log('error: getUser doesnt exist')
      return res
        .status(400)
        .send(new Error('An error occurred while processing this request. Please try again.'))
    }

    // pull relevant data from the query
    const { emailToVerify, token: storedUserToken, tokenExpiry } = response.data.getUser.verifyEmail

    // convert date to milliseconds and compare to make sure token not expired
    if (new Date(tokenExpiry).valueOf() < Date.now()) {
      console.log('error: token is expired')
      return res.status(400).send(new Error('Token is expired, please request a new one.'))
    }

    // check if the token in the db matches the token provided
    if (checkToken !== storedUserToken) {
      console.log('error: token doesnt match stored token')
      return res
        .status(400)
        .send(new Error('An error occurred while processing this request. Please try again.'))
    }

    // set the email as verified, we call this mutation because we need admin rights to perform the
    // mutation - for user permitted fields we would just append to the input object below
    await graphqlFetch(setEmailVerifiedMutation, { userId: id })

    // delete the verifyEmail field since the email has been verified
    await graphqlFetch(deleteVerifyEmailMutation, { id: response.data.getUser.verifyEmail.id })

    // only pass along the id because we do not want to save anything since changes have been made
    return res.send({
      input: {
        id,
        username: emailToVerify,
        email: emailToVerify,
      },
    })
  } catch (err) {
    console.log(err)
    return res.sendStatus(400).send(err)
  }
}
