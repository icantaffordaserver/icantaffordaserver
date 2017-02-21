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

export async function login(email, password) {
  const loginResponse = await fetch('/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (loginResponse.ok) {
    return loginResponse.json();
  }
  throw Error;
}

export function logout() {

}