export function matchedUsers(state = [], action) {
  switch (action.type) {
    case 'SET_MATCHED_USERS':
      return action.matchedUsers;
    default:
      return state;
  }
}
