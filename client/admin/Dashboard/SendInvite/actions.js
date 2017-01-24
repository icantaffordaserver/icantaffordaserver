/**
 * Created by alexandermann on 2017-01-21.
 */
import {handleResponse} from '../helpers';
import {CLEAR_MESSAGES} from '../../../shared/Messages/constants';
import {
    SEND_INVITE_FAILURE,
    SEND_INVITE_SUCCESS
} from './constants'

export function submitInviteForm(user, accountId, options) {
    return (dispatch) => {
        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch(options.resend ? `/invites/${options.inviteId}` : '/invites', {
            method: options.resend ? 'put' : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                sent_by_user_account_id: accountId,
                resend: options.resend
            })
        }).then((response) => {
            handleResponse(dispatch, response, SEND_INVITE_SUCCESS, SEND_INVITE_FAILURE);
        });
    };
}