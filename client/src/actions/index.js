export const SET_ACTIVE_FORM = 'SET_ACTIVE_FORM';

// setActiveForm is an ActionCreator, it needs to return an action,
// an object with a type property (this is a requirement)
export function setActiveForm (formName) {

    return {
        type: SET_ACTIVE_FORM,
        activeForm: formName
    };
}