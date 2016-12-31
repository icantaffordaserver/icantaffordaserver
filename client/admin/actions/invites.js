export function submitInviteForm(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/invites', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'SEND_INVITE_SUCCESS',
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'SEND_INVITE_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  }
}

export function fetchInvites() {
  return (dispatch) => {
    return fetch('/invites')
      .then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch(setInvites(Array.isArray(json) ? json : [json]));
          });
        }
      })
  }
}

function setInvites(invites) {
  return { type: 'SET_INVITES', invites: invites };
}
