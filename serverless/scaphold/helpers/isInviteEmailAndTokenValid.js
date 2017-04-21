/**
 * Created by alexandermann on 2017-04-11.
 */
import graphqlFetch from '../graphqlFetch';
import getInviteById from '../graphql/getInviteById';

export default async (inviteId, email, token) => {
  let response;
  try {
    response = await graphqlFetch(getInviteById, { inviteId });
    const { email: storedEmail, token: storedToken, isAccepted } = response.data.getInvites;
    if (email === storedEmail && token === storedToken && !isAccepted) {
      return true;
    }
    return false; // in all other cases return false
  } catch (error) {
    console.log(error);
    return;
  }
};
