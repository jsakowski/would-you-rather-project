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

export const getAnswers = (state, authedUser) => {
  return Object.keys(state[authedUser].answers)
}

export const getLeaders = (state) => {
  return Object.values(state)
    .map((user) => {
      const questionsTotal = user.questions.length
      const answersTotal = Object.keys(user.answers).length

      return {
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        questionsTotal: questionsTotal,
        answersTotal: answersTotal,
        score: questionsTotal + answersTotal
      }
    })
    .sort((a, b) => b.score - a.score)
}