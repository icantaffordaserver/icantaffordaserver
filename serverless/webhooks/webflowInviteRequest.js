/**
 * Created by alexandermann on 2017-04-05.
 */
import graphqlFetch from '../scaphold/graphqlFetch';
import createInviteRequestMutation from '../scaphold/graphql/createInviteRequestMutation';
import checkEmailExists from '../scaphold/helpers/checkEmailExists';

export default async (req, res) => {
  res.sendStatus(200); // reply to let the webhook know that we have received the request
  const { data: { name, email } } = req.body;
  try {
    console.log(email);
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      console.log('Email already exists, cannot create user');
      // TODO: additional logging here
    }

    await graphqlFetch(createInviteRequestMutation, {
      inviteRequest: { email, name, referredFrom: 'website' },
    });
  } catch (err) {
    console.dir(err);
  }
};
