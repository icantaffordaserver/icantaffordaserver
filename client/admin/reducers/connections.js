export function matchedUsers(state = [], action) {
  switch (action.type) {
    case 'SET_MATCHED_USERS':
      return action.matchedUsers;
    default:
      return state;
  }
}

export function selectedMatch(state = null, action) {
    switch (action.type){
        case 'SELECT_MATCH':
            return action.matchIndex;
        default:
          return state
    }
}