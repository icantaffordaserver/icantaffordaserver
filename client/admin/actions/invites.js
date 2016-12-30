export function fetchInvites() {
  return (dispatch) => {
    return fetch('/invites')
      .then((response) => {
        if (response.ok) {
          return response.json().then((response) => {
            dispatch(setInvites(response));
          });
        }
      })
  }
}

function setInvites(invites) {
  return { type: 'SET_INVITES', invites: invites };
}
