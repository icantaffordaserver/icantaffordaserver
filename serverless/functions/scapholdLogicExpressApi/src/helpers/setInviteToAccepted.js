/**
 * Created by alexandermann on 2017-04-12.
 */
import graphqlFetch from '../graphql/graphqlFetch';
import setInviteToAcceptedMutation from '../graphql/mutations/setInviteToAcceptedMutation';

export default async inviteId => graphqlFetch(setInviteToAcceptedMutation, { inviteId });
