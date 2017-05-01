/**
 * Created by alexandermann on 2017-02-10.
 */
import axios from 'axios'
import _ from 'lodash'
import graphqlFetch from 'graphql-fetch'

/**
 * Takes in all recent typeform responses and finds the one matching the user submission
 * @param webHookRequest
 * @param typeformDataApiResponses
 * @returns Response
 */
export function findResponse(webHookRequest, typeformDataApiResponses) {
  const { user_id: webHookUserId, response_id: webHookResponseId } = webHookRequest

  for (let i = 0; i < typeformDataApiResponses.length; i += 1) {
    const { user_id: typeformUserId, response_id: typeformResponseId } = typeformDataApiResponses[
      i
    ].hidden
    // check that the responseId from the webhook equals the one stored in the typeform database
    // and that the user id also matches
    if (webHookUserId === typeformUserId && webHookResponseId === typeformResponseId) {
      return typeformDataApiResponses[i]
    }
  }
  return Error('No response found')
}

/**
 * Take the form response, find the relating questions and parse a complete object with details
 * the questions into something that is readable and makes sense
 * @param response
 * @param typeformDataApiQuestions
 * @returns {{}}
 */
// Answers object looks like..
// { listimage_42481899_choice: 'Deep',
//   listimage_42483105_choice_53890487: 'Books',
//   listimage_42483105_choice_53890490: 'The meaning of life',
//   list_42487351_choice_53896250: 'An increase in energy',
//   list_42487351_choice_53896252: 'A fresh perspective',
//   textarea_42487449: 'Something cool',
//   textarea_42487463: 'Marshawnnnnn' }
export function parseProfileResponse(response, typeformDataApiQuestions) {
  const profile = {}
  // loop through the answers object on the response body
  _.forOwn(response.answers, (value, key) => {
    // find the index of the corresponding answer id to the question id
    const questionIndex = _.findIndex(typeformDataApiQuestions, question => {
      return key === question.id
    })
    // build the parsed profile question and answer object
    // check if question key already exists in the profile data structure
    if (_.has(profile, typeformDataApiQuestions[questionIndex].field_id)) {
      // key exists, push answer to answer array
      profile[typeformDataApiQuestions[questionIndex].field_id].answer.push(value)
    } else {
      // key doesn't exist, create new question answer object
      profile[typeformDataApiQuestions[questionIndex].field_id] = {
        questionText: typeformDataApiQuestions[questionIndex].question,
        answer: [value],
      }
    }
  })
  return profile
}
