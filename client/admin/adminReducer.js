import {combineReducers} from 'redux';
import messages from '../shared/Messages/reducer';
import auth from '../shared/Login/reducer';
import invites from './Dashboard/InvitesSent/reducer';
import {matchedUsers, selectedMatch} from './ConnectionPipeline/reducer';
import {users} from './UserMatching/reducer';
import userMatching from './UserMatching/reducer';
import modal from '../shared/Modal/reducer';

export default combineReducers({
    messages,
    auth,
    invites,
    users,
    userMatching,
    matchedUsers,
    selectedMatch,
    modal
});
