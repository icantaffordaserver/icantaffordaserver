/**
 * Created by alexandermann on 2017-04-10.
 */
import { isEmail, normalizeEmail } from 'validator';
import graphqlFetch from '../graphqlFetch';
import getUserByEmailQuery from '../graphql/getUserByEmailQuery';

// query scaphold to check if a user with the email specified already exists
export default async email => {
  // check if email is valid format
  if (!isEmail(email)) return true;

  // Normalize email
  const normalizedEmail = normalizeEmail(email);

  // query the submitted email
  const response = await graphqlFetch(getUserByEmailQuery, { email: normalizedEmail });

  // if the email does not exist there will be an empty array
  return response.data.viewer.allUsers.edges.length > 0;
};
