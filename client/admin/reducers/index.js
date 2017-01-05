import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import invites from './invites';
import { users } from './users';
import { matchedUsers } from './connections';

export default combineReducers({
  messages,
  auth,
  invites,
  users,
  matchedUsers
});
