/**
 * Created by alexandermann on 2017-01-13.
 */
export function showModal() {
    return {
        type: 'SHOW_MODAL',
        modalProps: {isOpen: true}
    };
}

export function closeModal() {
    return {
        type: 'HIDE_MODAL',
        modalProps: {isOpen: false}
    };
}
