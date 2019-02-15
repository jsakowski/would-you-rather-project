import { getInitialData } from '../utils/api'
import { getUsers } from '../actions/users'
import { getQuestions } from '../actions/questions'
import { login } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const AUTHED_ID = 'johndoe'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(getUsers(users))
        dispatch(getQuestions(questions))
        //dispatch(login(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}