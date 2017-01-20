export const SET_USERS = 'SET_USERS';

export function fetchUsers() {
    return (dispatch) => {
        return fetch('/users')
            .then((response) => {
                if (response.ok) {
                    return response.json().then((json) => {
                        dispatch({type: SET_USERS, users: json.data});
                    });
                }
            });
    };
}