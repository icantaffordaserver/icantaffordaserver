/**
 * Created by alexandermann on 2017-01-21.
 */
// Helper Functions
export function handleResponse(dispatch, response, successType, failureType) {
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