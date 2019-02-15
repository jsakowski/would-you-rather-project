export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

export function login(id) {
  return {
    type: LOGIN_SUCCESS,
    id,
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}
