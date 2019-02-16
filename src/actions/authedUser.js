export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const USER_LOGOUT = 'USER_LOGOUT'

export function login(id) {
  return {
    type: LOGIN_SUCCESS,
    id,
  }
}

export function logout() {
  return {
    type: USER_LOGOUT
  }
}
