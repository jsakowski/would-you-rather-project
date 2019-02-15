import { combineReducers } from 'redux'
import authedUser, * as fromAuthedUser from './authedUser'
import users, * as fromUsers from './users'
import questions, * as fromQuestions from './questions'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
})

export function getQuestionIds(state) {
  const { authedUser, users, questions} = state

  const uid = fromAuthedUser.getAuthedUserId(authedUser)
  const answeres = fromUsers.getAnswers(users, uid)

  return {
    'answered': fromQuestions.getQuestionIds(questions, answeres, 'answered'),
    'unanswered': fromQuestions.getQuestionIds(questions, answeres, 'unanswered')
  }
}