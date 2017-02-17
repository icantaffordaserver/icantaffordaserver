import messages from '../shared/Messages/reducer';
import auth from '../shared/Login/reducer';
import invites from './Dashboard/InvitesSent/reducer';
import inviteRequests from './Dashboard/InviteRequests/reducer';
import { matchedUsers, selectedMatch } from './ConnectionPipeline/reducer';
import { users, userMatching } from './UserMatching/reducer';
import modal from '../shared/Modal/reducer';

export default {
  messages,
  auth,
  invites,
  inviteRequests,
  users,
  userMatching,
  matchedUsers,
  selectedMatch,
  modal,
};
