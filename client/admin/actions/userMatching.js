export const SET_SEARCH_TEXT   = 'SET_SEARCH_TEXT';
export const SET_USER_INDEX    = 'SET_USER_INDEX';
export const SET_SELECTED_USER = 'SET_SELECTED_USER';


export function setSearchText(searchText) {
    return (dispatch) => {
        dispatch({
            type: SET_SEARCH_TEXT,
            searchText
        });
    };
}

export function setUserIndex(userIndex) {
    return (dispatch) => {
        dispatch({
            type: SET_USER_INDEX,
            userIndex
        });
    }
}

export function setSelectedUser(selectedUsers) {
    return (dispatch) => {
        dispatch({
            type: SET_SELECTED_USER,
            selectedUsers
        });
    }
}
