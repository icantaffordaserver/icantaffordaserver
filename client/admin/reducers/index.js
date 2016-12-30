import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import invites from './invites';

export default combineReducers({
  messages,
  auth,
  invites
});
