export function submitInviteForm(user, accountId, options) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch(options.resend ? '/invites/' + options.inviteId : '/invites', {
      method: options.resend ? 'put' : 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        sent_by_user_account_id: accountId,
        resend: options.resend
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
            dispatch(setInvites(Array.isArray(json.data) ? json.data : [json.data]));
          });
        }
      })
  }
}

function setInvites(invites) {
  return { type: 'SET_INVITES', invites: invites };
}
