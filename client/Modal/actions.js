/**
 * Created by alexandermann on 2017-01-23.
 */
import {HIDE_MODAL, SHOW_MODAL} from './constants';

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
