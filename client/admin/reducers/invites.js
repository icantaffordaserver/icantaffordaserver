const initialState = {
    all: [],
    selected: {},
    isPolling: false
};

export default function invites(state = initialState, action) {
    switch (action.type) {
        case 'BEGIN_FETCH_INVITES':
            return {
                ...state,
                isPolling: true
            }
        case 'FETCH_INVITES_SUCCESS':
            return {
                ...state,
                all: action.invites,
                isPolling: false
            }
        case 'FETCH_INVITES_FAILURE':
            return {
                ...state,
                isPolling: false
            };
        case 'SELECT_INVITE':
            return {
                ...state,
                selected: {...state.all[action.inviteIndex]}
            };
        case 'DESELECT_INVITE':
            return {
                ...state,
                selected: {}
            };
        default:
            return state;
    }
}
