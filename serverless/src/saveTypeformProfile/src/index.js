/**
 * Created by alexandermann on 2017-04-30.
 */
import 'babel-polyfill'
import axios from 'axios'
import client from 'graphql-fetch'

import { findResponse, parseProfileResponse } from './helpers'

export default async (event, context, callback) => {
  const adminToken = process.env.ADMIN_TOKEN
  const scapholdUrl = process.env.SCAPHOLD_URL
  const typeformAPIKey = process.env.TYPEFORM_API_KEY
  const formId = process.env.PROFILE_FORM_ID

  const requestBody = JSON.parse(event.body)
  const since = requestBody.created - 1 // subtract 1 second to make sure we get the response
  const typeformApiURL = `https://api.typeform.com/v1/form/${formId}?key=${typeformAPIKey}&completed=true&since=${since}&order_by[]=date_submit,desc`

  try {
    const apiResponse = await axios.get(typeformApiURL)
    const response = findResponse(requestBody, apiResponse.data.responses)
    const profileResponses = parseProfileResponse(response, apiResponse.data.questions)
    // the JSON object format
    const profileDataStore = {
      userId: response.hidden.user_id,
      responseId: response.hidden.response_id,
      dateLand: response.metadata.date_land,
      dateSubmit: response.metadata.date_submit,
      profileResponses,
    }
    const graphqlFetch = client(scapholdUrl, adminToken) // initialize the graphql fetch client
    // store the profile json to the database
    await graphqlFetch(
      `
        mutation addTypeformProfile($id: ID!, $typeformProfile: JSON!) {
          updateUser(input: {id: $id, typeformProfile: $typeformProfile, typeformProfileComplete: true}) {
            clientMutationId
          }
        }
      `,
      {
        id: response.hidden.user_id,
        typeformProfile: { ...profileDataStore },
      },
    )
    context.succeed({ statusCode: 200 })
  } catch (error) {
    console.error(error)
    context.fail(error)
  }
}
