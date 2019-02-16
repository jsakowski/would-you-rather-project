import { getInitialData } from '../utils/api'
import { loadUsers } from '../actions/users'
import { loadQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(loadUsers(users))
        dispatch(loadQuestions(questions))
        dispatch(hideLoading())
      })
  }
}