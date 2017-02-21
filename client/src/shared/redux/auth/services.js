/**
 * Created by alexandermann on 2017-02-17.
 */

/**
 * Checks if a user is logged in
 * @returns {boolean}
 */
export function loggedIn() {
  return !!localStorage.token;
}
export function getUserSession() {
  return JSON.parse(localStorage.getItem('user')) || false;
}
export function saveSession(token, user) {
  localStorage.token = token;
  localStorage.user = JSON.stringify(user);
}

export function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
