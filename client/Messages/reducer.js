/**
 * Created by alexandermann on 2017-01-20.
 */
import {
    CLEAR_MESSAGES,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    DELETE_ACCOUNT_SUCCESS,
    MATCH_USERS_SUCCESS,
    MATCH_USERS_FAILURE,
    SET_CONNECTION_TIME_SUCCESS,
    SET_CONNECTION_TIME_FAILURE,
    DELETE_CONNECTION_SUCCESS,
    DELETE_CONNECTION_FAILURE,
    CONTACT_FORM_FAILURE,
    CONTACT_FORM_SUCCESS,
    OAUTH_FAILURE,
    OAUTH_SUCCESS,
    UNLINK_FAILURE,
    UNLINK_SUCCESS,
    LINK_FAILURE,
    SEND_INVITE_FAILURE,
    SEND_INVITE_SUCCESS,
    RESEND_INVITE_FAILURE,
    RESEND_INVITE_SUCCESS,
    CANCEL_INVITE_SUCCESS,

} from './constants';

export default function messages(state = {}, action) {
    switch (action.type) {
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
        case UPDATE_PROFILE_FAILURE:
        case CHANGE_PASSWORD_FAILURE:
        case FORGOT_PASSWORD_FAILURE:
        case RESET_PASSWORD_FAILURE:
        case CONTACT_FORM_FAILURE:
        case OAUTH_FAILURE:
        case UNLINK_FAILURE:
        case LINK_FAILURE:
        case SEND_INVITE_FAILURE:
        case RESEND_INVITE_FAILURE:
        case MATCH_USERS_FAILURE:
        case SET_CONNECTION_TIME_FAILURE:
        case DELETE_CONNECTION_FAILURE:
            return {
                error: action.messages
            };
        case UPDATE_PROFILE_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
        case CONTACT_FORM_SUCCESS:
        case SEND_INVITE_SUCCESS:
        case RESEND_INVITE_SUCCESS:
        case CANCEL_INVITE_SUCCESS:
        case MATCH_USERS_SUCCESS:
        case SET_CONNECTION_TIME_SUCCESS:
        case DELETE_CONNECTION_SUCCESS:
            return {
                success: action.messages
            };
        case FORGOT_PASSWORD_SUCCESS:
        case DELETE_ACCOUNT_SUCCESS:
        case UNLINK_SUCCESS:
            return {
                info: action.messages
            };
        case CLEAR_MESSAGES:
            return {};
        default:
            return state;
    }
}
