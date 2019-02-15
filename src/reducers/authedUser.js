import { LOGIN_SUCCESS, LOGOUT } from '../actions/authedUser'

export default function authedUser (state = null, action) {
  switch (action.type) {
    case LOGIN_SUCCESS :
      return action.id
    case LOGOUT :
      return null
    default :
      return state
  }
}