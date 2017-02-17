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