const initialState = {
    all: [],
    selected: {}
};

export default function invites(state = initialState, action) {
    switch (action.type) {
        case 'SET_INVITES':
            return {
                ...state,
                all: action.invites
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
