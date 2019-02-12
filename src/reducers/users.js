import { GET_USERS } from '../actions/users'
import { SAVE_QUESTION_ANSWER } from '../actions/questions'

export default function users (state = {}, action) {
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

    default:
      return state
  }
}