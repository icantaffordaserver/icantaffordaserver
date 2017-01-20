export const SET_MATCHED_USERS           = 'SET_MATCHED_USERS';
export const CLEAR_MESSAGES              = 'CLEAR_MESSAGES';
export const MATCH_USERS_SUCCESS         = 'MATCH_USERS_SUCCESS';
export const MATCH_USERS_FAILURE         = 'MATCH_USERS_FAILURE';
export const SELECT_MATCH                = 'SELECT_MATCH';
export const SET_CONNECTION_TIME_SUCCESS = 'SET_CONNECTION_TIME_SUCCESS';
export const SET_CONNECTION_TIME_FAILURE = 'SET_CONNECTION_TIME_FAILURE';
export const DELETE_CONNECTION_SUCCESS   = 'DELETE_CONNECTION_SUCCESS';
export const DELETE_CONNECTION_FAILURE   = 'DELETE_CONNECTION_FAILURE';


export function fetchMatchedUsers() {
    return (dispatch) => {
        fetch('/connections')
            .then((response) => {
                if (response.ok) {
                    return response.json().then((json) => {
                        dispatch({type: SET_MATCHED_USERS, matchedUsers: json});
                    });
                }
            });
    }
}

export function submitMatchedUsers(user1Id, user2Id, adminUserId) {
    return (dispatch) => {
        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch('/connections', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user1_id: user1Id,
                user2_id: user2Id,
                admin_user_id: adminUserId
            })
        }).then((response) => {
            if (response.ok) {
                return response.json().then((json) => {
                    dispatch({
                        type: MATCH_USERS_SUCCESS,
                        messages: [json]
                    });
                });
            } else {
                return response.json().then((json) => {
                    dispatch({
                        type: MATCH_USERS_FAILURE,
                        messages: Array.isArray(json) ? json : [json]
                    });
                })
            }
        });
    };
}

export function selectMatch(matchIndex) {
    return {type: SELECT_MATCH, matchIndex: matchIndex};
}

export function setConnectionTime(connectionId, connectionTime) {
    return dispatch => {
        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch(`/connections/${connectionId}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                connection_time: connectionTime
            })
        }).then(response => {
            if (response.ok) {
                return response.json().then(json => {

                    dispatch({
                        type: SET_CONNECTION_TIME_SUCCESS,
                        messages: [json]
                    });
                })
            } else {
                return response.json().then(json => {
                    dispatch({
                        type: SET_CONNECTION_TIME_FAILURE,
                        messages: Array.isArray(json) ? json : [json]
                    });
                })
            }
        })

    };
}

export function deleteConnection(connectionId) {
    return dispatch => {
        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch(`/connections/${connectionId}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},

        }).then(response => {
            if (response.ok) {
                return response.json().then(json => {

                    dispatch({
                        type: DELETE_CONNECTION_SUCCESS,
                        messages: [json]
                    });
                })
            } else {
                return response.json().then(json => {
                    dispatch({
                        type: DELETE_CONNECTION_FAILURE,
                        messages: Array.isArray(json) ? json : [json]
                    });
                })
            }
        })

    };
}