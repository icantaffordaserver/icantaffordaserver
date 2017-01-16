// Helper Functions
function handleResponse(dispatch, response, successType, failureType) {
    if (response.ok) {
        return response.json().then((json) => {
            dispatch({
                type: successType,
                messages: [json]
            });
        });
    } else {
        return response.json().then((json) => {
            dispatch({
                type: failureType,
                messages: Array.isArray(json) ? json : [json]
            });
        });
    }
}

export function submitInviteForm(user, accountId, options) {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_MESSAGES'
        });
        return fetch(options.resend ? '/invites/' + options.inviteId : '/invites', {
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
            handleResponse(dispatch, response, 'SEND_INVITE_SUCCESS', 'SEND_INVITE_FAILURE');
        });
    };
}

export function editInviteForm(user, accountId, options) {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_MESSAGES'
        });
        return fetch('/invites/' + options.inviteId, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                sent_by_user_account_id: accountId,
                resend: options.resend
            })
        }).then((response) => {
            handleResponse(dispatch, response, 'SEND_INVITE_SUCCESS', 'SEND_INVITE_FAILURE');
        });
    };
}
export function resendInvite(inviteId) {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_MESSAGES'
        });
        return fetch('/invites/' + inviteId + '/resend')
            .then((response) => {
                handleResponse(dispatch, response, 'RESEND_INVITE_SUCCESS', 'RESEND_INVITE_FAILURE');
            });
    };
}

export function fetchInvites() {
    return (dispatch) => {
        dispatch(beginFetchInvites());
        return fetch('/invites')
            .then((response) => {
                if (response.ok) {
                    return response.json().then((json) => {
                        dispatch(fetchInvitesSuccess(Array.isArray(json.data) ? json.data : [json.data]));
                    });
                } else {
                    dispatch(fetchInvitesFailure());
                }
            });
    };
}

export function cancelInvite(inviteId) {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_MESSAGES'
        });
        return fetch('/invites/' + inviteId, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
            .then((response) => {
                if (response.ok) {
                    return response.json().then((json) => {
                        dispatch({
                            type: 'CANCEL_INVITE_SUCCESS',
                            messages: [json]
                        });
                    });
                }
            });
    };
}

export function selectInvite(inviteIndex) {
    return {type: 'SELECT_INVITE', inviteIndex: inviteIndex};
}

export function deselectInvite() {
    return {type: 'DESELECT_INVITE'};
}

function beginFetchInvites() {
    return {type: 'BEGIN_FETCH_INVITES'}
}

function fetchInvitesSuccess(invites) {
    return {type: 'FETCH_INVITES_SUCCESS', invites}
}

function fetchInvitesFailure() {
    return {type: 'FETCH_INVITES_FAILURE'}
}
