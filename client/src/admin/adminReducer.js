import messages from '../shared/components/Messages/reducer';
import invites from './Dashboard/InvitesSent/reducer';
import inviteRequests from './Dashboard/InviteRequests/reducer';
import { matchedUsers, selectedMatch } from './ConnectionPipeline/reducer';
import { users, userMatching } from './UserMatching/reducer';
import modal from '../shared/components/Modal/reducer';

export default {
  messages,
  invites,
  inviteRequests,
  users,
  userMatching,
  matchedUsers,
  selectedMatch,
  modal,
};
