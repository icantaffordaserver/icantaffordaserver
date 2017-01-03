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
