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

export const getQuestionIds = (state) => {
  const { authedUser, users, questions} = state

  const uid = fromAuthedUser.getAuthedUserId(authedUser)
  const answers = fromUsers.getAnswers(users, uid)

  return {
    'answered': fromQuestions.getQuestionIds(questions, answers, 'answered'),
    'unanswered': fromQuestions.getQuestionIds(questions, answers, 'unanswered')
  }
}

export const getLeaders = (state) => {
  const { users } = state
  return fromUsers.getLeaders(users)
}

export const formatQuestion = (state, qid) => {
  const { authedUser, users, questions } = state

  const uid = fromAuthedUser.getAuthedUserId(authedUser)
  const answer = fromUsers.getAnswer(users, qid, uid)
  const poll = fromQuestions.getQuestion(questions, qid)

  if (poll === null)
    return { poll: null }

  return {
    author: fromUsers.getVisibleUser(users, poll.author),
    poll: poll,
    vote: answer,
  }
}

export const getAuthedUser = (state) => {
  const { authedUser, users } = state

  const uid = fromAuthedUser.getAuthedUserId(authedUser)
  return fromUsers.getVisibleUser(users, uid)
}