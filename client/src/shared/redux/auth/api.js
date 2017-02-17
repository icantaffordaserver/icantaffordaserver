/**
 * Created by alexandermann on 2017-02-16.
 */
export function signup(firstName, lastName, email, password, inviteId) {
  return fetch(`/signup/invite/${inviteId}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
  });
}

export function login(email, password) {
  return fetch('/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function logout() {

}