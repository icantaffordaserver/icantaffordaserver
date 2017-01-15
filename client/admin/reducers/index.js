import {combineReducers} from 'redux';
import messages from './messages';
import auth from './auth';
import invites from './invites';
import {users} from './users';
import {matchedUsers} from './connections';
import userMatching from './userMatching';
import modal from './modal';

export default combineReducers({
    messages,
    auth,
    invites,
    users,
    userMatching,
    matchedUsers,
    modal
});
