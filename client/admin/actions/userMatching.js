export function setSearchText(searchText) {
  return (dispatch) => {
    dispatch({
      type: 'SET_SEARCH_TEXT',
      searchText
    });
  };
}

export function setUserIndex(userIndex) {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER_INDEX',
      userIndex
    });
  }
}

export function setSelectedUser(selectedUsers) {
  return (dispatch) => {
    dispatch({
      type: 'SET_SELECTED_USER',
      selectedUsers
    });
  }
}
