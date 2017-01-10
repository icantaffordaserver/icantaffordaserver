const initialState = {
  searchText: '',
  userIndex: 0,
  selectedUsers: []
}

export default function userMatching(state = initialState, action) {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return Object.assign({}, state, {
        searchText: action.searchText
      });
    case 'SET_USER_INDEX': {
      return Object.assign({}, state, {
        userIndex: action.userIndex
      });
    }
    case 'SET_SELECTED_USER':
      return Object.assign({}, state, {
        selectedUsers: action.selectedUsers
      });
    default:
      return state;
  }
}
