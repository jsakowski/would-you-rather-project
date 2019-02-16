import { LOGIN_SUCCESS, USER_LOGOUT } from '../actions/authedUser'

const authedUser = (state = null, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS :
      return action.id
    case USER_LOGOUT :
      return null
    default :
      return state
  }
}
export default authedUser

export const getAuthedUserId = (state) => {
  return state;
}