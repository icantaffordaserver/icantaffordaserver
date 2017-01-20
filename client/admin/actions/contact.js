export const CLEAR_MESSAGES       = 'CLEAR_MESSAGES';
export const CONTACT_FORM_SUCCESS = 'CONTACT_FORM_SUCCESS';
export const CONTACT_FORM_FAILURE = 'CONTACT_FORM_FAILURE';


export function submitContactForm(firstName, lastName, email, message) {
    return (dispatch) => {
        dispatch({
            type: CLEAR_MESSAGES
        });
        return fetch('/contact', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                message: message
            })
        }).then((response) => {
            if (response.ok) {
                return response.json().then((json) => {
                    dispatch({
                        type: CONTACT_FORM_SUCCESS,
                        messages: [json]
                    });
                });
            } else {
                return response.json().then((json) => {
                    dispatch({
                        type: CONTACT_FORM_FAILURE,
                        messages: Array.isArray(json) ? json : [json]
                    });
                });
            }
        });
    };
}
