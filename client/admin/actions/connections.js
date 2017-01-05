export function fetchMatchedUsers() {
  return (dispatch) => {
    fetch('/connections')
      .then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({ type: 'SET_MATCHED_USERS', matchedUsers: json });
          });
        }
      });
  }
}

export function submitMatchedUsers(user1Id, user2Id, adminUserId) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/connections', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user1_id: user1Id,
        user2_id: user2Id,
        admin_user_id: adminUserId
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'MATCH_USERS_SUCCESS',
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'MATCH_USERS_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        })
      }
    });
  };
}
