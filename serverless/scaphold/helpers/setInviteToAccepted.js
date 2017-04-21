/**
 * Created by alexandermann on 2017-04-12.
 */
import graphqlFetch from '../graphqlFetch';
import setInviteToAcceptedMutation from '../graphql/setInviteToAcceptedMutation';

export default async inviteId => graphqlFetch(setInviteToAcceptedMutation, { inviteId });
