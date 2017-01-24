/**
 * Created by alexandermann on 2017-01-23.
 */
export function resetPassword(password, confirm, pathToken) {
    return (dispatch) => {
        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch(`/reset/${pathToken}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                password: password,
                confirm: confirm
            })
        }).then((response) => {
            if (response.ok) {
                return response.json().then((json) => {
                    browserHistory.push('/login');
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                        messages: [json]
                    });
                });
            } else {
                return response.json().then((json) => {
                    dispatch({
                        type: RESET_PASSWORD_FAILURE,
                        messages: Array.isArray(json) ? json : [json]
                    });
                });
            }
        });
    };
}
