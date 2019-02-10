import { getInitialData } from '../utils/api'
import { getUsers } from '../actions/users'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(getUsers(users))
        dispatch(getQuestions(questions))
      })
  }
}