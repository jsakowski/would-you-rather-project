import { GET_USERS } from '../actions/users'
import { SAVE_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

const users = (state = {}, action) => {
  switch(action.type) {
    case GET_USERS :
      return {
        ...state,
        ...action.users
      }

    case SAVE_QUESTION_ANSWER :
      const { qid, authedUser, answer } = action.answer

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]:  answer
          }
        }
      }

    case ADD_QUESTION :
      const { question } = action
      const author = question.author
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(question.id)
        }
      }

    default:
      return state
  }
}
export default users

export const getVisibleUser = (state, uid) => {
  return {
    uid: uid,
    name: state[uid].name,
    avatarURL: state[uid].avatarURL
  }
}

export const getAnswers = (state, authedUser) => {
  return Object.keys(state[authedUser].answers)
}

export const getLeaders = (state) => {
  return Object.values(state)
    .map((user) => {
      const questionsTotal = user.questions.length
      const answersTotal = Object.keys(user.answers).length

      return {
        ...getVisibleUser(state, user.id),
        questionsTotal: questionsTotal,
        answersTotal: answersTotal,
        score: questionsTotal + answersTotal
      }
    })
    .sort((a, b) => b.score - a.score)
}

export const getAnswer = (state, qid, uid) => {
  const answer = state[uid].answers[qid]
  switch (answer) {
    case 'optionOne' :
      return 1
    case 'optionTwo' :
      return 2
    default :
      return 0
  }
}

export const getUsers = (state) => {
  return Object.values(state)
}