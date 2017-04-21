/**
 * Created by alexandermann on 2017-02-10.
 */
import axios from 'axios';
import _ from 'lodash';
import graphqlFetch from '../scaphold/graphqlFetch';

const typeformAPIKey = '133cd26567475cc5be624aa3db0a81b4b4536509';
const formId = 'aHq8UA';
const createTypeformProfileMutation = `
 mutation addTypeformProfile($id: ID!, $typeformProfile: JSON!) {
  updateUser(input: {id: $id, typeformProfile: $typeformProfile, typeformProfileComplete: true}) {
    clientMutationId
  }
}
`;

/**
 * Takes in all recent typeform responses and finds the one matching the user submission
 * @param webhookUserId
 * @param webhookResponseId
 * @param typeformDataApiResponses
 * @returns Response
 */
function findResponse(
  { user_id: webhookUserId, response_id: webhookResponseId },
  typeformDataApiResponses,
) {
  for (let i = 0; i < typeformDataApiResponses.length; i += 1) {
    const {
      user_id: typeformUserId,
      response_id: typeformResponseId,
    } = typeformDataApiResponses[i].hidden;
    // check that the responseId from the webhook equals the one stored in the typeform database
    // and that the user id also matches
    if (webhookUserId === typeformUserId && webhookResponseId === typeformResponseId) {
      return typeformDataApiResponses[i];
    }
  }
  return Error('No response found');
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
function parseProfileResponse(response, typeformDataApiQuestions) {
  const profile = {};
  // loop through the answers object on the response body
  _.forOwn(response.answers, (value, key) => {
    // find the index of the corresponding answer id to the question id
    const questionIndex = _.findIndex(typeformDataApiQuestions, question => {
      return key === question.id;
    });
    // build the parsed profile question and answer object
    // check if question key already exists in the profile data structure
    if (_.has(profile, typeformDataApiQuestions[questionIndex].field_id)) {
      // key exists, push answer to answer array
      profile[typeformDataApiQuestions[questionIndex].field_id].answer.push(value);
    } else {
      // key doesn't exist, create new question answer object
      profile[typeformDataApiQuestions[questionIndex].field_id] = {
        questionText: typeformDataApiQuestions[questionIndex].question,
        answer: [value],
      };
    }
  });
  return profile;
}

/**
 * POST request to /typeform
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
export default (async function handleWebhook(req, res, next) {
  const since = req.body.created - 1; // subtract 1 second to make sure we get the response
  const typeformApiURL = `https://api.typeform.com/v1/form/${formId}?key=${typeformAPIKey}&completed=true&since=${since}&order_by[]=date_submit,desc`;
  try {
    const apiResponse = await axios.get(typeformApiURL);
    const response = findResponse(req.body, apiResponse.data.responses);
    const profileResponses = parseProfileResponse(response, apiResponse.data.questions);
    // the JSON object format
    const profileDataStore = {
      userId: response.hidden.user_id,
      responseId: response.hidden.response_id,
      dateLand: response.metadata.date_land,
      dateSubmit: response.metadata.date_submit,
      profileResponses,
    };
    // store the profile json to the database
    await graphqlFetch(createTypeformProfileMutation, {
      id: response.hidden.user_id,
      typeformProfile: { ...profileDataStore },
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: 'An error occurred while processing the request.' });
  }
});
