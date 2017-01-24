/**
 * Created by alexandermann on 2017-01-23.
 */
const initialState = {
    modalType: null,
    modalProps: {
        isOpen: false
    }
};

export default function modal(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            };
        case 'HIDE_MODAL':
            return initialState;
        default:
            return state;
    }
}