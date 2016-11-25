import axios from 'axios';

export const SET_ACTIVE_FORM = 'SET_ACTIVE_FORM';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const FETCH_EMAILS_SENT = 'FETCH_EMAILS_SENT';

const ROOT_URL = 'http://localhost:3000/admin';

// setActiveForm is an ActionCreator, it needs to return an action,
// an object with a type property (this is a requirement)
export function setActiveForm (formName) {

    return {
        type: SET_ACTIVE_FORM,
        activeForm: formName
    };
}

export function submitForm (formData, template) {

    switch (template) {
        case 'PROFILE_BUILDING':
            template = 'profile-building';
            break;
        case 'PRE_CONNECTION':
            template = 'pre-connection';
            break;
        case 'SHIFT_SCHEDULED':
            template = 'shift-scheduled';
            break;
        case 'SHIFT_TODAY':
            template = 'shift-today';
            break;
        case 'POST_CONNECTION':
            template = 'post-connection';
            break;
        case 'REVIEW':
            template = 'review';
            break;
    }

    const request = axios.post(`${ROOT_URL}/send/${template}`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email
    });

    return {
        type: SUBMIT_FORM,
        payload: request
    };
}

export function fetchEmailsSent() {
    const request = axios.get(`${ROOT_URL}/emails`);
    return {
        type: FETCH_EMAILS_SENT,
        payload: request
    }
}