/**
 * Created by alexandermann on 2017-01-22.
 */
export function forgotPassword(email) {
    return (dispatch) => {
        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch('/forgot', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
        }).then((response) => {
            if (response.ok) {
                return response.json().then((json) => {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS,
                        messages: [json]
                    });
                });
            } else {
                return response.json().then((json) => {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILURE,
                        messages: Array.isArray(json) ? json : [json]
                    });
                });
            }
        });
    };
}