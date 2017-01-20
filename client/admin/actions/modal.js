/**
 * Created by alexandermann on 2017-01-13.
 */
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function showModal(modalType) {
    return {
        type: SHOW_MODAL,
        modalProps: {isOpen: true},
        modalType: modalType
    };
}

export function closeModal() {
    return {
        type: HIDE_MODAL,
        modalProps: {isOpen: false}
    };
}
