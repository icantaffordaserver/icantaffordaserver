export default function messages(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
    case 'UPDATE_PROFILE_FAILURE':
    case 'CHANGE_PASSWORD_FAILURE':
    case 'FORGOT_PASSWORD_FAILURE':
    case 'RESET_PASSWORD_FAILURE':
    case 'CONTACT_FORM_FAILURE':
    case 'OAUTH_FAILURE':
    case 'UNLINK_FAILURE':
    case 'LINK_FAILURE':
    case 'SEND_INVITE_FAILURE':
    case 'RESEND_INVITE_FAILURE':
    case 'MATCH_USERS_FAILURE':
    case 'SET_CONNECTION_TIME_FAILURE':
    case 'DELETE_CONNECTION_FAILURE':
      return {
        error: action.messages
      };
    case 'UPDATE_PROFILE_SUCCESS':
    case 'CHANGE_PASSWORD_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS':
    case 'CONTACT_FORM_SUCCESS':
    case 'SEND_INVITE_SUCCESS':
    case 'RESEND_INVITE_SUCCESS':
    case 'CANCEL_INVITE_SUCCESS':
    case 'MATCH_USERS_SUCCESS':
    case 'SET_CONNECTION_TIME_SUCCESS':
    case 'DELETE_CONNECTION_SUCCESS':
      return {
        success: action.messages
      };
    case 'FORGOT_PASSWORD_SUCCESS':
    case 'DELETE_ACCOUNT_SUCCESS':
    case 'UNLINK_SUCCESS':
      return {
        info: action.messages
      };
    case 'CLEAR_MESSAGES':
      return {};
    default:
      return state;
  }
}
